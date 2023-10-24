import { buildCollection, buildProperty } from "firecms";

export type Blog = {
  name: string;
  description: string;
  categories: string[];
  image: string;
  status: string;
  published: boolean;
  created_on: Date,
  updated_on: Date,
  expires_on: Date
}


export const blogsCollection = buildCollection<Blog>({
  name: "Boletín Agro",
  singularName: "blog",
  path: "blogs",
  icon: "RssFeed",
  group: "CMS",
  permissions: (): object => ({ read: true, edit: true, create: true, delete: true }),
  properties: {
    name: {
      name: "Titulo",
      validation: { required: true },
      dataType: "string"
    },
    description: {
      name: "Contenido",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
      name: "Imagen de la Capa",
      dataType: "string",
      storage: {
        storagePath: "blogs",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000"
        }
      }
    }),
    categories: {
      name: "Categoria",
      description: "Categoria del Post",
      validation: { required: false },
      dataType: "array",
      of: {
        dataType: "string"
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
