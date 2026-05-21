---
name: feedback-visual-validation
description: No lanzar validación visual ni sesiones de Chrome sin confirmación previa del usuario
metadata:
  type: feedback
---

No iniciar validación visual (screenshots, sesiones headless de Chrome, Playwright, etc.) sin preguntar primero al usuario.

**Why:** El usuario prefiere validar visualmente él mismo, y no quiere que el asistente arranque procesos de Chrome sin su consentimiento explícito.

**How to apply:** Después de hacer cambios de UI, reportar qué se ha hecho y preguntar "¿quieres que lo valide visualmente o lo compruebas tú?". Nunca arrancar Chrome ni tomar screenshots de forma autónoma.
