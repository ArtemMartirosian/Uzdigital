export function formatPhoneNumber(phoneNumber: string) {
  if (!phoneNumber.startsWith("+998") || phoneNumber.length !== 13) {
    throw new Error("Invalid phone number format");
  }

  const match = phoneNumber.match(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/);

  if (!match) {
    throw new Error("Invalid phone number format");
  }

  const formattedNumber = `${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;

  return formattedNumber;
}
