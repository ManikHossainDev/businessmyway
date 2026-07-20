"use client";
import InputComponent from "@/components/UI/InputComponent";
import { Form,  message } from "antd";
import { useRouter } from "next/navigation";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
    const router = useRouter();
  const onFinish = (values: ResetPasswordFormValues) => {
    console.log("Password reset successfully", values);
    message.success("Password reset successfully!");
    router.push("/login");
  };

  return (
    <section className=" w-[90%] mx-auto h-[90vh]  px-4 py-10 md:px-6 lg:px-10 bg-[#282828] my-10 rounded-md">
      <div className="w-full max-w-7xl mx-auto">
          {/* Reset Password Form Content */}
          <div className="w-full max-w-[450px] mx-auto px-4 md:px-0">
            <div className="bg-[#5E5E5E] shadow-lg rounded-lg mt-32 border-[3px] border-white">
              <div className="px-6 py-8 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-white  text-center ">
                Reset Password
                </h2>
                <p className="text-center pb-3 text-white">Your password must be 8-10 character long.</p>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-5"
                >
                  <Form.Item
                  label={<span className="text-white">Password</span>}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a new password",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputComponent
                      placeholder="New Password"
                      className="w-full p-3 border-b border-gray-300 "
                    />
                  </Form.Item>
                  <Form.Item
                  label={<span className="text-white">Confirm Password</span>}
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match")
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <InputComponent
                      placeholder="Confirm New Password"
                      className="w-full p-3 border-b border-gray-300 "
                    />
                  </Form.Item>
                  <button className="w-full px-5 py-3 bg-[#DB2424] rounded text-white">
                    Reset Password
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default ResetPassword;
