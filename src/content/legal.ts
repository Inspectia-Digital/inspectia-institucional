/**
 * Términos y condiciones, redactados y aprobados por el equipo legal (documento del 28
 * de julio de 2026).
 *
 * 🔴 **Este texto se pega verbatim y no se toca.** No reformular, no resumir, no
 * corregir estilo, no "mejorar" una frase. No es copy de marketing: cada palabra la puso
 * legal a propósito, y una paráfrasis en un documento contractual es un riesgo real. Lo
 * mismo vale para tres detalles que parecen erratas y no lo son:
 *
 * - Las comillas son **dobles rectas** ("TyC", "la Compañía"), no tipográficas.
 * - Los (i), (ii), (iii) van **en línea**, no como lista con viñetas.
 * - "6 (SEIS) meses" lleva SEIS en mayúsculas: es la convención legal para que el número
 *   no se pueda alterar sin que se note.
 *
 * La numeración 01–15 es la del original y tampoco se convierte a "Artículo 1".
 *
 * Vive como datos y no dentro del JSX para que la ruta quede sin texto suelto: quien
 * maquete la página no tiene el articulado a mano para editarlo sin querer.
 */

/** Fecha de la versión firmada, no la del último deploy. */
export const TERMS_UPDATED = "28 de julio de 2026";

export type LegalClause = {
  /** "01"–"15", con el cero adelante como en el original. */
  n: string;
  title: string;
  paragraphs: string[];
};

/** Encabezado, antes de la cláusula 01. Trae el CUIT y el domicilio ya confirmados. */
export const TERMS_INTRO: string[] = [
  'Los presentes Términos y Condiciones (en adelante, los "TyC") rigen la relación entre InspectIA (en adelante, "InspectIA", "la Compañía", "nosotros"), CUIT: 30-71939896-7, con domicilio en La Pampa 2208, y cualquier persona física o jurídica (en adelante, el "Cliente" o el "Usuario") que solicite información, contrate una demostración, utilice la calculadora de retorno de inversión (ROI) o contrate cualquiera de los servicios ofrecidos a través del sitio inspectia.ai o mediante propuesta comercial directa. Estos TyC deben leerse junto con la Política de Privacidad de InspectIA y, en su caso, con el Contrato de Servicios y sus Anexos Técnicos que se suscriban para cada implementación.',
];

export const TERMS_CLAUSES: LegalClause[] = [
  {
    n: "01",
    title: "Aceptación de los TyC",
    paragraphs: [
      "Al navegar el sitio, completar el formulario de contacto, utilizar la calculadora de ROI, agendar una reunión o contratar cualquiera de los servicios de InspectIA, el Cliente declara haber leído, comprendido y aceptado estos TyC. Cuando el Cliente sea una persona jurídica, quien acepte estos TyC en su nombre declara contar con facultades suficientes para obligarla.",
    ],
  },
  {
    n: "02",
    title: "Descripción de los Servicios",
    paragraphs: [
      "InspectIA ofrece, entre otras, las siguientes soluciones:",
      "Control de Calidad con Inteligencia Artificial: instalación de cámaras industriales en la línea de producción del Cliente para la captura de imágenes en condiciones operativas reales; etiquetado de dichas imágenes (data labeling) para distinguir productos conformes de productos con defectos; entrenamiento de un modelo de red neuronal convolucional a partir de ese dataset; testeo, validación y optimización del modelo mediante métricas de precisión, recall y tasa de falsos positivos; e implementación del modelo en el entorno productivo para la clasificación de imágenes en tiempo real, con capacidad de activar alarmas, detener u orientar líneas, y generar reportes y tableros de información.",
      "OEE Control: plataforma de software como servicio (SaaS) para el cálculo automático, en tiempo real, de los indicadores de Disponibilidad, Rendimiento y Calidad (OEE) por turno, línea o equipo, con carga de datos manual, automática o híbrida, tableros en tiempo real e identificación de cuellos de botella, microparadas y pérdidas de producción.",
      "Integraciones: conexión de las soluciones de InspectIA con sistemas del Cliente tales como PLC, SCADA, MES, ERP, sensores IoT, sistemas de visión artificial y APIs propias o de terceros, sujeto a lo dispuesto en la cláusula 07.",
      "Calculadora de ROI: herramienta informativa disponible en el sitio para que el Cliente potencial obtenga una estimación preliminar del retorno de inversión de las soluciones de InspectIA.",
      "La contratación de cada servicio, su alcance específico, plazos, entregables y condiciones comerciales particulares se formalizan en una propuesta comercial y/o Contrato de Servicios que prevalecerá sobre estos TyC en caso de conflicto en lo específicamente pactado.",
    ],
  },
  {
    n: "03",
    title: "Metodología de Implementación",
    paragraphs: [
      "La implementación de las soluciones de Control de Calidad con IA se desarrolla, en general, en cuatro etapas: (i) análisis de factibilidad técnica y económica; (ii) instalación del sistema de captura (cámaras y/o sensores); (iii) entrenamiento del modelo de inteligencia artificial; y (iv) implementación operativa. Los plazos de cada etapa son estimativos y dependen de factores propios de la planta del Cliente, la disponibilidad de su personal, la calidad y volumen de las imágenes disponibles para el entrenamiento, y la complejidad de las integraciones requeridas.",
    ],
  },
  {
    n: "04",
    title: "Naturaleza de la Tecnología de IA",
    paragraphs: [
      "El Cliente comprende y acepta que:",
      "El rendimiento de todo modelo de inteligencia artificial de visión por computadora depende directamente de la cantidad, calidad y representatividad de las imágenes utilizadas para su entrenamiento, así como de las condiciones de iluminación, velocidad de línea, tipo de defecto y demás variables del proceso productivo del Cliente.",
      "Ningún modelo alcanza una precisión del 100%. Las métricas de precisión, recall y tasa de falsos positivos/negativos informadas durante la etapa de testeo y validación constituyen el desempeño esperado del modelo en las condiciones evaluadas, y no una garantía de resultado absoluto ni de eliminación total de defectos o reprocesos.",
      "El desempeño del modelo puede degradarse ante cambios en el producto, el proceso, la iluminación, el hardware de captura o cualquier otra condición no contemplada en el entrenamiento original (data drift), en cuyo caso puede requerirse un reentrenamiento, cotizado por separado salvo que se encuentre incluido en el plan de soporte contratado.",
      "La calculadora de ROI disponible en el sitio ofrece una estimación preliminar e informativa, basada en los datos ingresados por el propio Cliente y en supuestos generales de la industria. No constituye una proyección financiera vinculante ni un compromiso de resultado por parte de InspectIA.",
    ],
  },
  {
    n: "05",
    title: "Alcance de la Instalación y Obligaciones del Cliente",
    paragraphs: [
      "Salvo acuerdo en contrario, el Cliente deberá proporcionar, a su cargo: acceso a la planta y a la línea de producción en los horarios necesarios; conectividad de red, alimentación eléctrica y espacio físico adecuado para la instalación de cámaras, sensores y equipos asociados; personal de contacto para la coordinación técnica; y las autorizaciones internas y de terceros (por ejemplo, comitentes o normas de seguridad e higiene de la planta) que resulten necesarias para la instalación y operación del sistema.",
      "Salvo que se pacte expresamente lo contrario en el Contrato de Servicios, el hardware (cámaras, sensores, equipos de cómputo en planta) instalado por InspectIA permanece bajo la modalidad de propiedad, comodato o alquiler que se establezca en la propuesta comercial correspondiente. El Cliente es responsable de la custodia, uso adecuado y buen estado del hardware entregado, y de informar sin demora cualquier falla, daño o desconexión del equipamiento.",
    ],
  },
  {
    n: "06",
    title: "Tratamiento de Imágenes, Datos y Datasets",
    paragraphs: [
      'Las imágenes, videos y demás datos de proceso capturados en la planta del Cliente (en adelante, los "Datos de Planta") son utilizados por InspectIA exclusivamente para: (i) el etiquetado, entrenamiento, testeo, validación y mejora continua del modelo de IA del Cliente; (ii) la operación del servicio contratado; y (iii) fines de soporte técnico. InspectIA se compromete a tratar los Datos de Planta con confidencialidad y a no divulgarlos a terceros ajenos a la prestación del servicio, sin perjuicio de lo dispuesto en la cláusula 08.',
      "El Cliente garantiza que cuenta con las autorizaciones necesarias para permitir la captura de imágenes en su planta, incluyendo, de corresponder, las que involucren la presencia incidental de personal en el campo de visión de las cámaras, y que dicha captura se realiza conforme a la normativa de protección de datos personales y de relaciones laborales aplicable en su jurisdicción. InspectIA recomienda, y el Cliente acepta implementar, las medidas de encuadre y señalización que correspondan para minimizar la captura de datos personales no necesarios para el servicio.",
      "InspectIA podrá utilizar los Datos de Planta y los datasets derivados, de forma agregada y anonimizada o disociada de la identidad del Cliente, para el desarrollo, mejora y entrenamiento de sus modelos y productos en general, sin que ello implique la cesión de los Datos de Planta identificables a terceros.",
    ],
  },
  {
    n: "07",
    title: "Propiedad Intelectual",
    paragraphs: [
      'El software, algoritmos, arquitecturas de modelos, código fuente, metodologías, documentación y demás desarrollos de base de InspectIA (en adelante, la "Tecnología Base") son de propiedad exclusiva de InspectIA. El Cliente recibe, durante la vigencia del contrato y sujeto al pago de las contraprestaciones pactadas, una licencia de uso no exclusiva, no transferible y limitada a sus propios fines productivos sobre el modelo entrenado específicamente con sus Datos de Planta.',
      "Los Datos de Planta aportados por el Cliente y los reportes o tableros generados a partir de su propia operación permanecen de titularidad del Cliente. Nada en estos TyC transfiere al Cliente derechos sobre la Tecnología Base de InspectIA, ni a InspectIA derechos de propiedad sobre los Datos de Planta más allá de la licencia de uso descripta en la cláusula 06.",
    ],
  },
  {
    n: "08",
    title: "Integraciones con Sistemas de Terceros",
    paragraphs: [
      "Cuando el servicio contratado incluya la integración con sistemas del Cliente o de terceros (PLC, SCADA, MES, ERP, sensores IoT u otras APIs), el Cliente será responsable de proveer los accesos, credenciales, documentación técnica y soporte de sus proveedores necesarios para dicha integración. InspectIA no será responsable por fallas, indisponibilidad, cambios de versión o discontinuidad de sistemas de terceros que se encuentren fuera de su control, ni por los daños que de ello se deriven, sin perjuicio de que realizará los mejores esfuerzos comercialmente razonables para adaptar la integración a dichos cambios, cotizando el trabajo adicional si correspondiera.",
    ],
  },
  {
    n: "09",
    title: "Tarifas, Facturación y Suscripciones",
    paragraphs: [
      "Las tarifas, forma de pago, moneda, plazos y condiciones de facturación aplicables a cada servicio (incluyendo la implementación del sistema de Control de Calidad con IA y las suscripciones al software OEE Control) se establecen en la propuesta comercial o Contrato de Servicios correspondiente.",
      "Servicios de implementación (Control de Calidad con IA): por su naturaleza de proyecto, se facturan conforme al cronograma de hitos pactado (por ejemplo, análisis de factibilidad, instalación, entrenamiento y puesta en marcha). Los importes abonados por hitos ya ejecutados no son reembolsables.",
      "Suscripciones (OEE Control y planes de soporte/mantenimiento del sistema de IA): se contratan por períodos mensuales o anuales y se renuevan automáticamente al finalizar cada ciclo, salvo cancelación por el Cliente con la anticipación prevista en el Contrato de Servicios. No se realizan reembolsos por ciclos ya iniciados.",
      "Ajuste de precios: InspectIA podrá ajustar los precios de sus suscripciones, comunicando el nuevo importe al Cliente con una anticipación mínima de 30 días corridos a su entrada en vigencia. Si el Cliente no acepta el ajuste, podrá cancelar la suscripción sin penalidad antes de dicha fecha.",
      "Mora: la falta de pago en los plazos pactados podrá dar lugar a la suspensión del servicio, sin perjuicio de los intereses y demás consecuencias previstas en el Contrato de Servicios.",
    ],
  },
  {
    n: "10",
    title: "Soporte, Mantenimiento y Reentrenamiento",
    paragraphs: [
      "El alcance del soporte técnico, mantenimiento del hardware, actualizaciones de software y reentrenamiento periódico del modelo de IA se define en el plan contratado por el Cliente. Salvo pacto expreso, no se encuentran incluidos en la tarifa de implementación inicial el reentrenamiento por cambios sustanciales de producto o proceso, ni la reparación de hardware dañado por uso indebido, negligencia o causas ajenas al funcionamiento normal del equipo.",
    ],
  },
  {
    n: "11",
    title: "Limitación de Responsabilidad",
    paragraphs: [
      'Los servicios se prestan "tal cual" y "según disponibilidad", conforme a las métricas de desempeño validadas en la etapa de testeo. InspectIA no garantiza la detección del 100% de los defectos ni la ausencia total de falsos positivos o negativos, ni resultados financieros específicos derivados del uso de sus soluciones o de la calculadora de ROI.',
      "En la máxima medida permitida por la ley aplicable, la responsabilidad total de InspectIA frente al Cliente por cualquier reclamo derivado de estos TyC o del Contrato de Servicios, ya sea contractual, extracontractual o de otra naturaleza, no superará el monto efectivamente abonado por el Cliente a InspectIA por el servicio específico que dio origen al reclamo durante los 6 (SEIS) meses previos al hecho generador. InspectIA no será responsable por daños indirectos, lucro cesante, pérdida de producción o de datos, salvo dolo o culpa grave.",
    ],
  },
  {
    n: "12",
    title: "Confidencialidad",
    paragraphs: [
      "Cada parte se obliga a mantener confidencial la información técnica, comercial y operativa de la otra parte a la que acceda con motivo de la relación (incluyendo Datos de Planta, especificaciones de producto, procesos y parámetros de calidad), utilizándola exclusivamente para los fines del servicio contratado, y a no divulgarla a terceros sin autorización previa, salvo requerimiento legal o de autoridad competente, en los plazos y forma acordada al contratar el servicio.",
    ],
  },
  {
    n: "13",
    title: "Fuerza Mayor",
    paragraphs: [
      "Ninguna de las partes será responsable por incumplimientos o retrasos derivados de casos fortuitos o de fuerza mayor, incluyendo fallas masivas de conectividad, cortes masivos de suministro eléctrico, desastres naturales, conflictos gremiales o medidas gubernamentales que no pudieran ser previstas, y cuestiones ajenas a su control razonable.",
    ],
  },
  {
    n: "14",
    title: "Modificación de los TyC",
    paragraphs: [
      "InspectIA podrá modificar estos TyC en cualquier momento. Las modificaciones serán publicadas en el Sitio indicando su fecha de vigencia. La continuidad en el uso del Sitio implica la aceptación de las nuevas condiciones.",
    ],
  },
  {
    n: "15",
    title: "Jurisdicción y Contacto",
    paragraphs: [
      "Estos TyC se rigen por las leyes de la República Argentina. Toda controversia que no pueda resolverse amigablemente será sometida a los tribunales ordinarios competentes de la Ciudad de Buenos Aires, con renuncia expresa a cualquier otro fuero o jurisdicción.",
      "Por consultas sobre estos TyC o sobre cualquier servicio contratado, el Cliente puede comunicarse a:",
      "Correo electrónico: contacto@inspectia.ai",
      "Teléfono: +54 11 3469 3537",
    ],
  },
];
