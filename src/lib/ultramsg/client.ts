type SendMessageParams = {
  to: string;
  body: string;
};

type UltraMsgResponse = {
  sent?: string;
  message?: string;
  id?: number;
  error?: string;
};

export async function sendWhatsAppMessage({
  to,
  body,
}: SendMessageParams): Promise<UltraMsgResponse> {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
  const token = process.env.ULTRAMSG_TOKEN;

  if (!instanceId || !token) {
    throw new Error("ULTRAMSG_INSTANCE_ID e ULTRAMSG_TOKEN são obrigatórios");
  }

  const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      token,
      to,
      body,
      priority: "10",
    }),
  });

  const data = (await response.json()) as UltraMsgResponse;

  if (!response.ok || data.error) {
    throw new Error(
      `UltraMsg falhou: ${data.error ?? response.statusText} (${to})`,
    );
  }

  return data;
}
