import { buildCollection, buildProperty } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Tool = {
  name: string;
  url: string;
  status: string;
  published: boolean;
  created_on: Date,
  updated_on: Date,
  expires_on: Date
}


export const toolsCollection = buildCollection<Tool>({
  name: "Utilidades",
  singularName: "Utilidad",
  path: "tools",
  icon: "Handyman",
  group: "CMS",
  permissions: (): object => ({ read: true, edit: true, create: true, delete: true }),
  properties: {
    name: {
      name: "Titulo",
      validation: { required: true },
      dataType: "string"
    },
    url: {
      name: "URL",
      url: true,
      validation: { required: true },
      dataType: "string"
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
    expires_on: {
      name: "Expira",
      dataType: "date"
    },
    created_on: {
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
