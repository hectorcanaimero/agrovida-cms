import { buildCollection, buildProperty } from "firecms";

export type Banner = {
  name: string;
  url: string;
  image: string;
  category: string[];
  status: string;
  published: boolean;
  created_on: Date,
  updated_on: Date,
  expires_on: Date
}


export const bannersCollection = buildCollection<Banner>({
  name: "Banners",
  singularName: "Banner",
  path: "banners",
  icon: "AdUnits",
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
    category: {
      name: "Categoria",
      validation: { required: true },
      dataType: "array",
      of: {
        dataType: "string",
        enumValues: {
          block1: "block1",
          block2: "block2",
          block3: "block3",
          block4: "block4",
          block5: "block5",
        }
      }
  },
    image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
      name: "Imagen de la Capa",
      dataType: "string",
      storage: {
        storagePath: "banners",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000"
        }
      }
    }),
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
