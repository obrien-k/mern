import React from "react";
import { useForm, Controller } from "react-hook-form";

const Input = React.forwardRef(({ type, name, size, id, onChange }, ref) => (
  <input
    ref={ref}
    type={type}
    size={size}
    name={name}
    id={id}
    onChange={onChange}
  />
));

const Select = React.forwardRef(({ name, id, options, onChange }, ref) => (
  <select ref={ref} name={name} id={id} onChange={onChange}>
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));

const Settings = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => console.log(data);

  const stylesheets = [
    { value: "6", label: "Anorex" },
    { value: "5", label: "Kuro" },
    { value: "1", label: "Layer cake" },
  ];

  return (
    <form className="main_column" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="stylesheet"
        id="stylesheet"
        control={control}
        defaultValue="1"
        render={({ field }) => <Select options={stylesheets} {...field} />}
      />

      <Controller
        name="styleurl"
        id="styleurl"
        control={control}
        defaultValue=""
        render={({ field }) => <Input type="text" size="40" {...field} />}
      />

      <Controller
        name="useopendyslexic"
        id="useopendyslexic"
        control={control}
        defaultValue={false}
        render={({ field }) => <Input type="checkbox" {...field} />}
      />

      <Controller
        name="usetooltipster"
        id="usetooltipster"
        control={control}
        defaultValue={false}
        render={({ field }) => <Input type="checkbox" {...field} />}
      />

      <Controller
        name="autoload_comm_stats"
        id="autoload_comm_stats"
        control={control}
        defaultValue={false}
        render={({ field }) => <Input type="checkbox" {...field} />}
      />

      <Controller
        name="avatar"
        id="avatar"
        control={control}
        defaultValue=""
        render={({ field }) => <Input type="text" size="50" {...field} />}
      />

      <input type="submit" />
    </form>
  );
};

export default Settings;
