"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Form, Input, Spin } from "antd";
import Swal from "sweetalert2";
import { FiArrowLeft } from "react-icons/fi";
import {
  useGetAdminSettingQuery,
  useUpdateAdminSettingMutation,
  type SettingSlug,
} from "@/redux/features/settings/settingsApi";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded border border-[#E8E0D4] bg-white">
      <Spin />
    </div>
  ),
});

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    ["link"],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ],
};

type PolicyFormValues = {
  title: string;
  emails?: string;
  phones?: string;
  address?: string;
};

type AdminPolicyEditorProps = {
  slug: SettingSlug;
  fallbackTitle: string;
  showContactMeta?: boolean;
};

const PUBLIC_PAGE_BY_SLUG: Record<SettingSlug, string> = {
  about_us: "/about-us",
  privacy_policy: "/privacy-policy",
  terms_and_conditions: "/terms-condition",
  refund_policy: "/refundpolicy",
  shipping_policy: "/shippingpolicy",
};

const isContentEmpty = (html?: string) =>
  !html ||
  html.replace(/<(.|\n)*?>/g, "").replace(/&nbsp;/g, " ").trim().length === 0;

const AdminPolicyEditor = ({
  slug,
  fallbackTitle,
  showContactMeta = false,
}: AdminPolicyEditorProps) => {
  const router = useRouter();
  const [form] = Form.useForm<PolicyFormValues>();
  const [content, setContent] = useState("");
  const [editorReady, setEditorReady] = useState(false);
  const { data, isLoading, isFetching, isSuccess, isError } = useGetAdminSettingQuery(slug, {
    refetchOnMountOrArgChange: true,
  });
  const [updateSetting, { isLoading: isSaving }] = useUpdateAdminSettingMutation();
  const setting = data?.data;

  useEffect(() => {
    setEditorReady(false);
    setContent("");
  }, [slug]);

  useEffect(() => {
    if (!isSuccess || isFetching) return;

    form.setFieldsValue({
      title: setting?.title || fallbackTitle,
      emails: setting?.metadata?.emails || "",
      phones: setting?.metadata?.phones || "",
      address: setting?.metadata?.address || "",
    });
    setContent(setting?.content || "");
    setEditorReady(true);
  }, [isSuccess, isFetching, setting, fallbackTitle, form]);

  const onFinish = async (values: PolicyFormValues) => {
    if (isContentEmpty(content)) {
      Swal.fire({
        title: "Error",
        text: "Content cannot be empty.",
        icon: "error",
      });
      return;
    }

    try {
      await updateSetting({
        slug,
        body: {
          title: values.title,
          content,
          metadata: showContactMeta
            ? {
                emails: values.emails || "",
                phones: values.phones || "",
                address: values.address || "",
              }
            : undefined,
        },
      }).unwrap();

      await Swal.fire({
        title: "Saved",
        text: `${fallbackTitle} updated successfully.`,
        icon: "success",
      });

      router.push(PUBLIC_PAGE_BY_SLUG[slug]);
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        `Failed to update ${fallbackTitle.toLowerCase()}.`;
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
    }
  };

  if (isLoading || isFetching || !editorReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError && !setting) {
    return (
      <p className="text-sm text-red-600">
        Could not load {fallbackTitle.toLowerCase()}. Please try again.
      </p>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/settings"
          className="inline-flex items-center text-[#8A8174] hover:text-[#1A1A1A]"
        >
          <FiArrowLeft className="text-2xl" />
        </Link>
        <h2 className="text-2xl font-semibold">Edit {fallbackTitle}</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="rounded-2xl border border-[#E8E0D4] bg-[#F6F3EE] p-5 md:p-8"
      >
        <Form.Item
          label={<span className="text-sm text-gray-700">Title</span>}
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input className="!rounded-sm !py-2.5" placeholder="Page title" />
        </Form.Item>

        <Form.Item label={<span className="text-sm text-gray-700">Content</span>}>
          <div className="overflow-hidden rounded-md bg-white [&_.ql-container]:min-h-[300px] [&_.ql-editor]:min-h-[300px]">
            <ReactQuill
              key={`${slug}-${setting?.updatedAt || "default"}`}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={editorModules}
            />
          </div>
        </Form.Item>

        {showContactMeta ? (
          <>
            <Form.Item
              label={<span className="text-sm text-gray-700">Emails</span>}
              name="emails"
            >
              <Input className="!rounded-sm !py-2.5" placeholder="hello@example.com" />
            </Form.Item>
            <Form.Item
              label={<span className="text-sm text-gray-700">Phones</span>}
              name="phones"
            >
              <Input className="!rounded-sm !py-2.5" placeholder="+44..." />
            </Form.Item>
            <Form.Item
              label={<span className="text-sm text-gray-700">Address</span>}
              name="address"
            >
              <Input.TextArea rows={3} className="!rounded-sm" placeholder="Street, city" />
            </Form.Item>
          </>
        ) : null}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-[3px] bg-[#C1892F] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#AD7A28] disabled:opacity-60"
          >
            {isSaving ? "Updating..." : "Update"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AdminPolicyEditor;
