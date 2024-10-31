/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/perfil` | `/Login` | `/_sitemap` | `/auth/AuthContext` | `/auth/sessionService` | `/auth/tokenUtils` | `/auth/useAuth` | `/home` | `/nav` | `/pages\Home` | `/pages\Login` | `/pages\nav` | `/perfil`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
