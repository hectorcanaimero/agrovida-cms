import { buildCollection, buildProperty } from "firecms";

export type User = {
  display_name: string;
  email: string;
  uid: string;
  type: number;
  status: string;
  published: boolean;
  created_time: Date,
  updated_on: Date
}


export const usersCollection = buildCollection<User>({
  name: "Users",
  singularName: "User",
  path: "users",
  icon: "Group",
  group: "CMS",
  permissions: (): object => ({ read: true, edit: true, create: false, delete: false }),
  properties: {
    display_name: {
      name: "Nombre",
      validation: { required: true },
      dataType: "string"
    },
    email: {
      name: "Correo Electrónico",
      email: true,
      validation: { required: true },
      dataType: "string"
    },
    uid: {
      name: "Identificador Auth",
      validation: { required: true },
      dataType: "string"
    },
    type: {
      name: "Tipo de Usuario",
      validation: { required: true },
      dataType: "number",
    },
    status: {
      name: "Status",
      validation: { required: true },
      dataType: "string",
      description: "¿Debería este producto ser visible en la App?",
      longDescription: "",
      enumValues: {
        private: "Private",
        public: "Public"
      }
    },
    published: ({ values }) => buildProperty({
      name: "Publicado",
      dataType: "boolean",
      columnWidth: 100,
      disabled: values.status === "public"
        ? false
        : {
          clearOnDisabled: true,
          disabledMessage: "Status must be public in order to enable this the published flag"
        }

    }),
    created_time: {
      name: "Creado",
      dataType: "date",
      autoValue: "on_create"
    },
    updated_on: {
      name: "Actualizado",
      dataType: "date",
      autoValue: "on_update"
    }
  }
});
