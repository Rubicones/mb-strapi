import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectMedia extends Struct.ComponentSchema {
  collectionName: 'components_project_media';
  info: {
    displayName: 'Media';
    icon: 'landscape';
  };
  attributes: {
    Comment: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ProjectProgram extends Struct.ComponentSchema {
  collectionName: 'components_project_programs';
  info: {
    displayName: 'Program';
    icon: 'dashboard';
  };
  attributes: {
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.media': ProjectMedia;
      'project.program': ProjectProgram;
    }
  }
}
