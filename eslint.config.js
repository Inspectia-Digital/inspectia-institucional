import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",

      // Ningún color escrito a mano. Todo color sale de un token, que es lo que hace que
      // cambiar la paleta sea tocar dos archivos y no doscientos.
      //
      // Viene del linter de adherencia del design system, que está escrito para oxlint.
      // Se porta sólo esta regla: las otras dos de aquel archivo obligan a usar el kit de
      // componentes de la **aplicación**, y la web tiene el suyo a propósito —un botón de
      // la web no tiene que parecerse a uno de la app—.
      //
      // El repo ya cumplía; la regla existe para que siga cumpliendo sin depender de que
      // alguien se acuerde.
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message:
            "Sin colores literales: usá un token de src/tokens (var(--…)) o una utilidad de Tailwind mapeada en styles.css.",
        },
      ],
    },
  },
  {
    // Las dos excepciones a la regla de arriba, y las dos son reales.
    //
    // `error-page.ts` se sirve como HTML suelto cuando la aplicación ya falló: puede que
    // la hoja de estilos no haya cargado, o que el fallo esté justamente ahí. Es el único
    // lugar del repo donde un color tiene que estar escrito en el archivo.
    //
    // En `ui/chart.tsx` los hex no son colores que se ponen: son selectores de atributo
    // —`[&_.recharts-cartesian-grid_line[stroke='#ccc']]`— que apuntan a los colores que
    // Recharts trae cableados, justamente para pisarlos con un token. Prohibirlos ahí
    // sería impedir la corrección, no el desvío.
    files: ["src/lib/error-page.ts", "src/components/ui/chart.tsx"],
    rules: { "no-restricted-syntax": "off" },
  },
  eslintPluginPrettier,
);
