"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Form, Input, Spin } from "antd";
import Swal from "sweetalert2";
import { FiArrowLeft } from "react-icons/fi";
import {
  useGetAdminSettingQuery,
  useUpdateAdminSettingMutation,
  type SettingSlug,
} from "@/redux/features/settings/settingsApi";

type PolicyFormValues = {
  title: string;
  content: string;
  emails?: string;
  phones?: string;
  address?: string;
};

type AdminPolicyEditorProps = {
  slug: SettingSlug;
  fallbackTitle: string;
  showContactMeta?: boolean;
};

const AdminPolicyEditor = ({
  slug,
  fallbackTitle,
  showContactMeta = false,
}: AdminPolicyEditorProps) => {
  const [form] = Form.useForm<PolicyFormValues>();
  const { data, isLoading, isError } = useGetAdminSettingQuery(slug);
  const [updateSetting, { isLoading: isSaving }] = useUpdateAdminSettingMutation();
  const setting = data?.data;

  useEffect(() => {
    if (!setting) return;
    form.setFieldsValue({
      title: setting.title || fallbackTitle,
      content: setting.content || "",
      emails: setting.metadata?.emails || "",
      phones: setting.metadata?.phones || "",
      address: setting.metadata?.address || "",
    });
  }, [setting, fallbackTitle, form]);

  const onFinish = async (values: PolicyFormValues) => {
    try {
      await updateSetting({
        slug,
        body: {
          title: values.title,
          content: values.content,
          metadata: showContactMeta
            ? {
                emails: values.emails || "",
                phones: values.phones || "",
                address: values.address || "",
              }
            : undefined,
        },
      }).unwrap();

      Swal.fire({
        title: "Saved",
        text: `${fallbackTitle} updated successfully.`,
        icon: "success",
      });
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

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        Could not load {fallbackTitle.toLowerCase()}. Please try again.
      </p>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/settings"
        className="mb-4 inline-flex items-center gap-2 text-sm text-[#8A8174] hover:text-[#1A1A1A]"
      >
        <FiArrowLeft />
        Back to settings
      </Link>
      <h2 className="mb-1 text-2xl font-semibold">{fallbackTitle}</h2>
      <p className="mb-6 text-[#8A8174]">Update the public page content.</p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="rounded-2xl border border-[#E8E0D4] bg-white p-5 md:p-8"
      >
        <Form.Item
          label={<span className="text-sm text-gray-700">Title</span>}
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input className="!rounded-sm !py-2.5" placeholder="Page title" />
        </Form.Item>

        <Form.Item
          label={<span className="text-sm text-gray-700">Content</span>}
          name="content"
        >
          <Input.TextArea
            rows={12}
            className="!rounded-sm"
            placeholder="Write page content here. HTML is allowed."
          />
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

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-[3px] bg-[#C1892F] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-white hover:bg-[#AD7A28] disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </Form>
    </div>
  );
};

export default AdminPolicyEditor;
