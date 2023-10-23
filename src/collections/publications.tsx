import { buildCollection, buildProperty } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Publication = {
  name: string;
  file_upload: string;
  categories: string[];
  status: string;
  published: boolean;
  created_on: Date,
  updated_on: Date,
  expires_on: Date
}


export const publicationsCollection = buildCollection<Publication>({
  name: "Publicaciones UCV",
  singularName: "publication",
  path: "publications",
  icon: "LibraryBooks",
  group: "CMS",
  permissions: (): object => ({ read: true, edit: true, create: true, delete: true }),
  properties: {
    name: {
      name: "Titulo",
      validation: { required: true },
      dataType: "string"
    },
    file_upload: buildProperty({ // The `buildProperty` method is a utility function used for type checking
      name: "Archivo PDF",
      dataType: "string",
      storage: {
        storagePath: "publications",
        acceptedFiles: ["application/pdf"],
        metadata: {
          cacheControl: "max-age=1000000"
        }
      }
    }),
    categories: {
      name: "Categoria",
      validation: { required: true },
      dataType: "array",
      of: {
        dataType: "string",
        enumValues: {
          magazine1: "Revista 1",
          magazine2: "Revista 2",
        }
      }
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
