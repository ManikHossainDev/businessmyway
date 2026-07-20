"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Form
      name="change-password"
      layout="vertical" // Sets labels on top of inputs
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="Current Password"
        name="currentPassword"
        rules={[{ message: "Please input your current password!" }]}
      >
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          prefix={<FaLock />}
          suffix={
            showPassword ? (
              <FaRegEye onClick={togglePasswordVisibility} />
            ) : (
              <FaRegEyeSlash onClick={togglePasswordVisibility} />
            )
          }
          className="bg-transparent border border-black px-3 py-2 rounded-md"
        />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ message: "Please input your new password!" }]}
      >
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter New Password"
          prefix={<FaLock />}
          suffix={
            showPassword ? (
              <FaRegEye onClick={togglePasswordVisibility} />
            ) : (
              <FaRegEyeSlash onClick={togglePasswordVisibility} />
            )
          }
          className="bg-transparent border border-black px-3 py-2 rounded-md"
        />
      </Form.Item>

      <Form.Item
        label="Confirm New Password"
        name="confirmPassword"
        rules={[
          { message: "Please confirm your new password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          prefix={<FaLock />}
          suffix={
            showConfirmPassword ? (
              <FaRegEye onClick={toggleConfirmPasswordVisibility} />
            ) : (
              <FaRegEyeSlash onClick={toggleConfirmPasswordVisibility} />
            )
          }
          className="bg-transparent border border-black px-3 py-2 rounded-md"
        />
      </Form.Item>

      <Form.Item className="flex justify-end items-center">
        <Button className="bg-gray-300  text-black px-4 py-2 rounded-md mr-3">
            Cancel
        </Button>
        <Button className="bg-red-500 text-white" htmlType="submit">
          Save Change
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
