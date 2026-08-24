"use client";

import { useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import Swal from "sweetalert2";
import { FiEdit2 } from "react-icons/fi";
import {
  useCreateCategoryMutation,
  useGetAdminCategoriesQuery,
  useUpdateCategoryMutation,
  type Category,
} from "@/redux/features/category/categoryApi";

type CategoryFormValues = {
  name: string;
};

const CategoryPage = () => {
  const [form] = Form.useForm<CategoryFormValues>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { data, isLoading } = useGetAdminCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const categories = data?.data || [];
  const isSaving = isCreating || isUpdating;

  const openAddModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue({ name: category.name });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const onFinish = async (values: CategoryFormValues) => {
    try {
      const name = values.name.trim();
      const isEdit = Boolean(editingCategory);
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, name }).unwrap();
      } else {
        await createCategory({ name }).unwrap();
      }
      closeModal();
      Swal.fire({
        title: isEdit ? "Updated" : "Created",
        text: isEdit
          ? "Category updated successfully."
          : "Category added successfully.",
        icon: "success",
      });
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        `Failed to ${editingCategory ? "update" : "create"} category.`;
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
        <h2 className="text-2xl font-semibold">Category</h2>
        <p className="text-sm text-[#8A8174]">Manage your product categories</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="rounded-[3px] bg-[#C1892F] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#AD7A28]"
        >
          Add Category
        </button>
      </div>

      <div className="rounded-2xl border border-[#E8E0D4] bg-white">
        {isLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Spin />
          </div>
        ) : categories.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-[#8A8174]">
            No categories yet. Add one to get started.
          </p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between gap-3 border-b border-[#F0EAE2] px-5 py-4 last:border-b-0"
              >
                <span className="text-sm font-medium text-[#1A1A1A]">{category.name}</span>
                <button
                  type="button"
                  onClick={() => openEditModal(category)}
                  className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#E8E0D4] px-3 py-1.5 text-xs font-medium text-[#5C564C] hover:bg-[#F6F3EE]"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        destroyOnClose
        title={editingCategory ? "Edit Category" : "Add Category"}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="mt-4"
        >
          <Form.Item
            label={<span className="text-sm text-gray-700">Category name</span>}
            name="name"
            rules={[
              { required: true, message: "Please enter a category name" },
              { min: 2, message: "Name must be at least 2 characters" },
              { max: 80, message: "Name must be 80 characters or less" },
            ]}
          >
            <Input className="!rounded-sm !py-2.5" placeholder="e.g. Cigarettes" />
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
              {isSaving ? "Saving..." : editingCategory ? "Update" : "Create"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;
