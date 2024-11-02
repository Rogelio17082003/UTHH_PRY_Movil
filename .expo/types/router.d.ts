/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/materias` | `/(tabs)/materias/` | `/(tabs)/materias/DetallePracticaAlumno` | `/(tabs)/materias/actividades` | `/(tabs)/materias/detalleActividad` | `/(tabs)/perfil` | `/(tabs)/perfil/` | `/Login` | `/_sitemap` | `/auth/AuthContext` | `/auth/sessionService` | `/auth/tokenUtils` | `/auth/useAuth` | `/home` | `/materias` | `/materias/` | `/materias/DetallePracticaAlumno` | `/materias/actividades` | `/materias/detalleActividad` | `/nav` | `/perfil` | `/perfil/`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
