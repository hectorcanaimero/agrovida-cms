import { buildCollection, buildProperty } from "firecms";

export type Job = {
  title_job: string;
  specialty: string;
  company: string;
  description: string;
  email: string;
  phone: string;
  status: string;
  published: boolean;
  created_on: Date,
  updated_on: Date,
  expires_on: Date
}


export const jobsCollection = buildCollection<Job>({
  name: "Ofertas Empleo",
  singularName: "Job",
  path: "jobs",
  icon: "Work",
  group: "CMS",
  permissions: (): object => ({ read: true, edit: true, create: false, delete: true }),
  properties: {
    title_job: {
      name: "Cargo",
      validation: { required: true },
      dataType: "string"
    },
    company: {
      name: "Compañia",
      validation: { required: true },
      dataType: "string"
    },
    email: {
      name: "Correo Electrónico",
      email: true,
      validation: { required: true },
      dataType: "string"
    },
    phone: {
      name: "Teléfono Contacto",
      email: true,
      validation: { required: true },
      dataType: "string"
    },
    specialty: {
      name: "Especialidad",
      validation: { required: true },
      dataType: "string"
    },
    description: {
      name: "Bio",
      validation: { required: true },
      dataType: "string",
      markdown: true,
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
