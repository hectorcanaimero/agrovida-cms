import { buildCollection, buildProperty } from "firecms";

export type TechnicalAdvisor = {
  fullName: string;
  bio: string;
  email: string;
  phone: string;
  specialty: string;
  avatar: string;
  user: string;
  status: string;
  published: boolean;
  created_on: Date,
  updated_on: Date,
  expires_on: Date
}

export const technicalAdvisorCollection = buildCollection<TechnicalAdvisor>({
  name: "Asesores Técnicos",
  singularName: "advisor",
  path: "advisors",
  icon: "PersonPin",
  group: "CMS",
  permissions: (): object => ({ read: true, edit: true, create: true, delete: true }),
  properties: {
    fullName: {
      name: "Nombre Completo",
      validation: { required: true },
      dataType: "string"
    },
    email: {
      name: "Correo Electrónico",
      validation: { required: true },
      dataType: "string"
    },
    phone: {
      name: "Teléfono Contacto",
      validation: { required: true },
      dataType: "string"
    },
    specialty: {
      name: "Especialidad",
      validation: { required: true },
      dataType: "string"
    },
    bio: {
      name: "Bio",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    avatar: buildProperty({ // The `buildProperty` method is a utility function used for type checking
      name: "Avatar",
      dataType: "string",
      storage: {
        storagePath: "blogs",
        acceptedFiles: ["image/*"],
        metadata: {
          cacheControl: "max-age=1000000"
        }
      }
    }),
    user: {
      name: "Usuário",
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

