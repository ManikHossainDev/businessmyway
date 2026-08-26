"use client";

import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import Swal from "sweetalert2";
import { LockOutlined } from "@ant-design/icons";
import ProductPhoto from "@/components/UI/ProductPhoto";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/api/baseApi";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";
import { useCheckoutOrderMutation } from "@/redux/features/orders/orderApi";
import { cartApi, useClearCartMutation } from "@/redux/features/cart/cartApi";

type CartItem = {
  id: string;
  image: string;
  title: string;
  price: number;
  qty: number;
};

type DeliveryType = "in_delivery" | "paid_delivery";

type CheckoutFormValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  deliveryType: DeliveryType;
};

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onCartCleared?: () => void;
};

const IN_DELIVERY_FEE = 10;
const PAID_DELIVERY_FEE = 4.99;

const formatDefaultLocation = (profile?: {
  savedAddresses?: Array<{
    houseNumber?: string;
    area?: string;
    location?: string;
    postcode?: string;
    isDefault?: boolean;
  }>;
}) => {
  const addresses = profile?.savedAddresses || [];
  const selected = addresses.find((address) => address.isDefault) || addresses[0];
  if (!selected) return "";
  return [selected.houseNumber, selected.area, selected.location, selected.postcode]
    .filter(Boolean)
    .join(", ");
};

const DeliveryOption = ({
  selected,
  title,
  hint,
  onClick,
}: {
  selected: boolean;
  title: string;
  hint: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 rounded-md border px-3 py-3 text-left transition ${
      selected ? "border-[#BF8D2F] bg-[#FBF6EC]" : "border-[#E5E5E5] bg-white hover:border-[#BF8D2F]"
    }`}
  >
    <p className="text-sm font-semibold text-[#1A1A1A]">{title}</p>
    <p className="mt-1 text-xs text-gray-500">{hint}</p>
  </button>
);

const CheckoutModal = ({ open, onClose, cartItems, onCartCleared }: CheckoutModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<CheckoutFormValues>();
  const { data: profileData, isFetching } = useGetProfileQuery({}, { skip: !open });
  const [checkoutOrder, { isLoading }] = useCheckoutOrderMutation();
  const [clearCart] = useClearCartMutation();
  const profile = profileData?.data;
  const deliveryType = Form.useWatch("deliveryType", form) || "in_delivery";
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = deliveryType === "paid_delivery" ? PAID_DELIVERY_FEE : IN_DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      deliveryType: form.getFieldValue("deliveryType") || "in_delivery",
      name: profile?.name || form.getFieldValue("name") || "",
      phone: profile?.phone || form.getFieldValue("phone") || "",
      email: profile?.email || form.getFieldValue("email") || "",
      location: formatDefaultLocation(profile) || form.getFieldValue("location") || "",
    });
  }, [open, profile, form]);

  const emptyCartUi = () => {
    dispatch(
      cartApi.util.updateQueryData("getCart", undefined, (draft) => {
        draft.data = [];
      }),
    );
    onCartCleared?.();
  };

  const onPay = async () => {
    try {
      const values = await form.validateFields();
      const result = await checkoutOrder({
        ...values,
        origin: window.location.origin,
      }).unwrap();
      emptyCartUi();
      try {
        await clearCart().unwrap();
      } catch {
        dispatch(baseApi.util.invalidateTags(["cart"]));
      }
      if (result.data?.direct && result.data.orderId) {
        onClose();
        router.push(`/order-success?orderId=${result.data.orderId}&direct=1`);
        return;
      }
      if (result.data?.url) {
        onClose();
        window.location.assign(result.data.url);
      }
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Could not start checkout. Please check your details and try again.";
      if ((error as { errorFields?: unknown })?.errorFields) return;
      await Swal.fire({
        icon: "error",
        title: "Checkout",
        text: message,
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={920}
      destroyOnHidden
      centered
      title={null}
      className="checkout-modal"
    >
      <div className="mb-5 border-b border-[#EDEDED] pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[#BF8D2F]">Secure checkout</p>
        <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] md:text-3xl">
          Delivery details
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {deliveryType === "paid_delivery"
            ? "Confirm your information, then pay securely with Stripe."
            : "Confirm your information and place a direct Case In Delivery order."}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <Form form={form} layout="vertical" requiredMark={false} initialValues={{ deliveryType: "in_delivery" }}>
          <Form.Item
            label="Full name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input size="large" placeholder="Your name" />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input size="large" placeholder="Phone number" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="Email address" />
          </Form.Item>
          <Form.Item
            label="Delivery location"
            name="location"
            rules={[{ required: true, message: "Delivery location is required" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="House number, area, location, postcode"
            />
          </Form.Item>
          <Form.Item
            label="Delivery option"
            name="deliveryType"
            rules={[{ required: true, message: "Choose a delivery option" }]}
          >
            <div className="flex gap-3">
              <DeliveryOption
                selected={deliveryType === "in_delivery"}
                title="Case In Delivery"
                hint={`Direct order · £${IN_DELIVERY_FEE.toFixed(2)}`}
                onClick={() => form.setFieldValue("deliveryType", "in_delivery")}
              />
              <DeliveryOption
                selected={deliveryType === "paid_delivery"}
                title="Paid Delivery"
                hint={`Courier delivery · £${PAID_DELIVERY_FEE.toFixed(2)}`}
                onClick={() => form.setFieldValue("deliveryType", "paid_delivery")}
              />
            </div>
          </Form.Item>
        </Form>

        <div className="rounded-md border border-[#EDEDED] bg-[#FAFAF8] p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]">
            Order summary
          </h3>
          <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded border border-[#E5E5E5] bg-white">
                  <ProductPhoto src={item.image} alt={item.title} className="h-full w-full object-contain p-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-[#1A1A1A]">{item.title}</p>
                  <p className="text-xs text-gray-500">Qty {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  £{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-[#E5E5E5] pt-4 text-sm">
            <div className="flex justify-between text-[#1A1A1A]">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#1A1A1A]">
              <span>{deliveryType === "paid_delivery" ? "Paid Delivery" : "Case In Delivery"}</span>
              <span>{deliveryFee ? `£${deliveryFee.toFixed(2)}` : "Included"}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-[#1A1A1A]">Total</span>
              <span className="text-lg font-bold text-[#BF8D2F]">£{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onPay}
            disabled={isLoading || isFetching || cartItems.length === 0}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-sm bg-[#BF8D2F] py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {deliveryType === "paid_delivery" ? <LockOutlined /> : null}
            {isLoading
              ? deliveryType === "paid_delivery"
                ? "Redirecting to Stripe..."
                : "Placing order..."
              : deliveryType === "paid_delivery"
                ? "Pay securely with Stripe"
                : "Place direct order"}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            {deliveryType === "paid_delivery"
              ? "You will be redirected to Stripe to complete payment."
              : "This order is placed directly. Pay £10 delivery with the order."}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
