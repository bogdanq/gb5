import { useState } from "react";
import { Input, Button, Divider } from "@mui/material";

export function LoginForm({ title, submitButton, onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeForm = (e) => {
    const field = e.target.getAttribute("data-name");

    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return;
    }

    try {
      await onSubmit(form.email, form.password);
    } catch {
      console.log("handleSubmit:error");
    }
  };

  return (
    <div>
      <h1>{title}</h1>

      <Divider />

      <Input
        fullWidth
        placeholder="Введите email ..."
        value={form.email}
        inputProps={{
          "data-name": "email",
        }}
        onChange={handleChangeForm}
      />
      <Input
        fullWidth
        placeholder="Введите password ..."
        value={form.password}
        inputProps={{
          "data-name": "password",
        }}
        onChange={handleChangeForm}
      />
      <Button onClick={handleSubmit}>{submitButton}</Button>
    </div>
  );
}
