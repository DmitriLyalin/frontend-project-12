import { Button, Group, TextInput, PasswordInput } from "@mantine/core";
import { useForm, hasLength, matchesField } from "@mantine/form";
import { useNavigate } from "react-router";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useAuth = create(
  persist(
    (set) => ({
      username: "",
      token: "",
    }),
    {
      name: "auth", // name of the item in the storage (must be unique)
    }
  )
);

const VisibilityToggleIcon = ({ reveal }) =>
  reveal ? (
    <EyeSlashIcon
      style={{ width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" }}
    />
  ) : (
    <EyeIcon
      style={{ width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" }}
    />
  );
function Login() {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: hasLength({ min: 3, max: 20 }, "От 3 до 20 символов"),
      password: hasLength({ min: 5 }, "Не менее 6 символов"),
      confirmPassword: matchesField("password", "Пароли должны совпадать"),
    },

    onValuesChange: (values) => {
      form.clearErrors();
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          const { confirmPassword, ...fields } = values;
          console.log(fields);
          fetch("/api/v1/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fields),
          })
            .then((response) => {
              if (!response.ok) {
                console.log(response);
                throw new Error(response.status);
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              useAuth.setState({
                username: data.username,
                token: data.token,
              });

              navigate("/", { replace: true });
            })
            .catch((error) => {
              if (error.message === "401") {
                form.setFieldError(
                  "password",
                  "Неверные имя пользователя или пароль"
                );
              }
            });
        })}
      >
        <TextInput
          maw={320}
          mx="auto"
          withAsterisk
          label="Имя пользователя"
          placeholder=""
          name="username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          maw={320}
          mx="auto"
          placeholder="Введите пароль"
          visibilityToggleIcon={VisibilityToggleIcon}
          label="Пароль"
          name="password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          maw={320}
          mx="auto"
          placeholder="Подтвердите пароль"
          visibilityToggleIcon={VisibilityToggleIcon}
          label="Подтвердите пароль"
          name="confirmPassword"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Зарегистрироваться</Button>
        </Group>
      </form>
    </>
  );
}
export default Login;
