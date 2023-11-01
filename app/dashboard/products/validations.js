export default function Validations(data) {
  const regexEmail = RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  );
  const errors = {};

  if (data.name?.length < 5) errors.name = "Debe tener mínimo 5 caracteres";
  if (data.name?.length === 45) errors.name = "Menor a 45 caracteres";

  if (data.surname?.length < 5)
    errors.surname = "Debe tener mínimo 5 caracteres";
  if (data.surname?.length === 45) errors.surname = "Menor a 45 caracteres";

  if (!regexEmail.test(data.email))
    errors.email = "Proporcione un email válido";
  if (data.email?.length === 45) errors.email = "Menor a 45 caracteres";

  if (data.password?.length < 7)
    errors.password = "Debe tener mínimo 7 caracteres";
  if (data.password?.length === 45) errors.password = "Menor a 45 caracteres";

  return errors;
}
