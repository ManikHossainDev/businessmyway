"use client";

import { useState } from "react";
import { ConfigProvider, Form, Input, Modal, Select, Spin, Switch } from "antd";
import Swal from "sweetalert2";
import GifRevealWrapper from "@/components/UI/GifRevealWrapper";
import {
  useAddAddressMutation,
  useGetProfileQuery,
  useRemoveAddressMutation,
  useSetDefaultAddressMutation,
  useUpdateAddressMutation,
  type SavedAddress,
  type SavedAddressPayload,
} from "@/redux/features/Profile/Profile";

type AddressFormValues = SavedAddressPayload;

const AddressCard = ({
  address,
  onEdit,
  onRemove,
  onSetDefault,
}: {
  address: SavedAddress;
  onEdit: (address: SavedAddress) => void;
  onRemove: (address: SavedAddress) => void;
  onSetDefault: (address: SavedAddress) => void;
}) => {
  const lines = [address.houseNumber, address.area, address.location, address.postcode].filter(Boolean);

  return (
    <div className="relative flex-1 rounded-md border border-gray-300 p-5">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-serif text-lg font-bold text-[#c98a3e]">{address.label}</h3>
        {address.isDefault && (
          <span className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-700">
            Default
          </span>
        )}
      </div>

      <div className="mb-5 text-sm leading-6 text-gray-800">
        {address.houseNumber ? <p>House no: {address.houseNumber}</p> : null}
        {address.area ? <p>Area name: {address.area}</p> : null}
        {address.location ? <p>Location: {address.location}</p> : null}
        {address.postcode ? <p>Postcode: {address.postcode}</p> : null}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700">
        <button type="button" onClick={() => onEdit(address)} className="underline hover:text-gray-900">
          Edit
        </button>
        {!address.isDefault && (
          <>
            <span className="text-gray-300">|</span>
            <button type="button" onClick={() => onSetDefault(address)} className="hover:text-gray-900">
              Set Default
            </button>
          </>
        )}
        <span className="text-gray-300">|</span>
        <button type="button" onClick={() => onRemove(address)} className="hover:text-gray-900">
          Remove
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  const [form] = Form.useForm<AddressFormValues>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SavedAddress | null>(null);
  const { data, isLoading } = useGetProfileQuery({});
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const [removeAddress] = useRemoveAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();

  const profile = data?.data;
  const addresses: SavedAddress[] = profile?.savedAddresses || [];
  const isSaving = isAdding || isUpdating;

  const openAddModal = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({
      label: "Home",
      isDefault: addresses.length === 0,
    });
    setModalOpen(true);
  };

  const openEditModal = (address: SavedAddress) => {
    setEditing(address);
    form.setFieldsValue({
      label: address.label,
      houseNumber: address.houseNumber,
      area: address.area,
      location: address.location,
      postcode: address.postcode,
      isDefault: address.isDefault,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const onFinish = async (values: AddressFormValues) => {
    try {
      const payload = {
        label: values.label.trim(),
        houseNumber: values.houseNumber.trim(),
        area: values.area.trim(),
        location: values.location.trim(),
        postcode: values.postcode?.trim() || "",
        isDefault: Boolean(values.isDefault),
      };
      if (editing) {
        await updateAddress({ id: editing.id, ...payload }).unwrap();
      } else {
        await addAddress(payload).unwrap();
      }
      closeModal();
      Swal.fire({
        title: editing ? "Updated" : "Added",
        text: editing ? "Address updated successfully." : "Address added to your profile.",
        icon: "success",
      });
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message || "Failed to save address.";
      Swal.fire({ title: "Error", text: message, icon: "error" });
    }
  };

  const handleRemove = async (address: SavedAddress) => {
    const confirmed = await Swal.fire({
      title: "Remove address?",
      text: `${address.label} will be removed from your profile.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C1892F",
      cancelButtonColor: "#8A8174",
      confirmButtonText: "Remove",
    });
    if (!confirmed.isConfirmed) return;
    try {
      await removeAddress(address.id).unwrap();
      Swal.fire({ title: "Removed", text: "Address removed successfully.", icon: "success" });
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message || "Failed to remove address.";
      Swal.fire({ title: "Error", text: message, icon: "error" });
    }
  };

  const handleSetDefault = async (address: SavedAddress) => {
    try {
      await setDefaultAddress(address.id).unwrap();
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message || "Failed to set default address.";
      Swal.fire({ title: "Error", text: message, icon: "error" });
    }
  };

  return (
    <div className="py-8">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold">
          <span className="text-[#1f2a44]">Personal </span>
          <span className="text-[#c98a3e]">Details</span>
        </h1>
        <GifRevealWrapper borderSize={3}>
          <button
            type="button"
            onClick={openAddModal}
            className="h-[40px] w-[200px] rounded-sm bg-[#BF8D2F] px-2 font-medium text-white transition-colors hover:bg-[#a97922] md:w-[180px] lg:w-[200px] lg:px-[10px] lg:py-[10px]"
          >
            Add New Address
          </button>
        </GifRevealWrapper>
      </div>

      {isLoading ? (
        <div className="flex min-h-[180px] items-center justify-center">
          <Spin />
        </div>
      ) : addresses.length === 0 ? (
        <p className="mt-6 rounded-md border border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
          No saved addresses yet. Add one to your profile.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={openEditModal}
              onRemove={handleRemove}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        destroyOnHidden
        title={editing ? "Edit Address" : "Add New Address"}
      >
        <ConfigProvider theme={{ token: { colorPrimary: "#C1892F" } }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-4"
            requiredMark={false}
          >
            <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <Form.Item
                label="Label"
                name="label"
                rules={[{ required: true, message: "Please select a label" }]}
              >
                <Select
                  options={[
                    { label: "Home", value: "Home" },
                    { label: "Work", value: "Work" },
                    { label: "Other", value: "Other" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="House number"
                name="houseNumber"
                rules={[{ required: true, message: "Please enter house number" }]}
              >
                <Input placeholder="e.g. 14" />
              </Form.Item>
            </div>
            <Form.Item
              label="Area name"
              name="area"
              rules={[{ required: true, message: "Please enter area name" }]}
            >
              <Input placeholder="e.g. Bloomsbury" />
            </Form.Item>
            <Form.Item
              label="Full location"
              name="location"
              rules={[{ required: true, message: "Please enter the full location" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="e.g. 14 Montague Street, London, WC1B 5BP"
              />
            </Form.Item>
            <Form.Item label="Postcode" name="postcode">
              <Input placeholder="e.g. WC1B 5BP (optional)" />
            </Form.Item>
            <Form.Item
              name="isDefault"
              valuePropName="checked"
              label={<span className="text-sm text-gray-700">Set as default address</span>}
            >
              <Switch />
            </Form.Item>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-[3px] border border-[#E8E0D4] px-4 py-2 text-sm font-medium text-[#5C564C] hover:bg-[#F6F3EE]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-[3px] bg-[#C1892F] px-5 py-2 text-sm font-semibold text-white hover:bg-[#AD7A28] disabled:opacity-60"
              >
                {isSaving ? "Saving..." : editing ? "Update" : "Add Address"}
              </button>
            </div>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  );
};

export default Page;
