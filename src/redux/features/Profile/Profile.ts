import { baseApi } from "@/redux/api/baseApi";

const Profile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetProfile: builder.query({
      query: () => ({
        url: "/api/v1/users/self/in",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    UpdateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/self/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/general-info/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
  useGetProfileQuery, 
  useUpdateProfileMutation, 
  useDeleteProfileMutation, 
} = Profile;