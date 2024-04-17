import { z } from "zod";

export const RolSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    permission_of_information: z.boolean({
        required_error: "Permission of information is required"
    }),
    permission_Warehouse: z.boolean({
        required_error: "Permission Warehouse is required"
    }),
    permission_Summary: z.boolean({
        required_error: "Permission Summary is required"
    }),
    permission_of_Office: z.boolean({
        required_error: "Permission of office is required"
    }),
    permission_of_all_Agencys: z.boolean({
        required_error: "Permission of all Agencys is required"
    }),


    date: z.string().datetime().optional(),
})