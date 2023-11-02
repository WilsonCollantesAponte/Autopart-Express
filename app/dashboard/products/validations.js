export default function Validations(data) {
  const errors = {};

  if (data.name?.length < 1) errors.name = "Debe tener mínimo 1 caracteres";
  if (data.name?.length === 45) errors.name = "Menor a 45 caracteres";

  if (data.brand?.length < 1) errors.brand = "Debe tener mínimo 1 caracteres";
  if (data.brand?.length === 45) errors.brand = "Menor a 45 caracteres";

  if (data.model?.length < 1) errors.model = "Debe tener mínimo 1 caracteres";
  if (data.model?.length === 45) errors.model = "Menor a 45 caracteres";

  return errors;
}
