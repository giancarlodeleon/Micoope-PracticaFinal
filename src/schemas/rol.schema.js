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
    permission_of_Client: z.boolean({
        required_error: "Permission of client is required"
    }),
    permission_of_add_Client: z.boolean({
        required_error: "Permission of add client is required"
    }),
    permission_of_add_Product: z.boolean({
        required_error: "Permission of add Product is required"
    }),
    permission_add_stock: z.boolean({
        required_error: "Permission of add Stock is required"
    }),

    permission_takeout_stock: z.boolean({
        required_error: "Permission of takeout Stock is required"
    }),
    permission_Request: z.boolean({
        required_error: "Permission of Request is required"
    }),
    permission_Historial: z.boolean({
        required_error: "Permission of Historial is required"
    }),


    date: z.string().datetime().optional(),
})