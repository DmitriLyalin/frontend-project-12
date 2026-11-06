import {
  Button,
  Checkbox,
  Group,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useForm, hasLength, matchesField } from "@mantine/form";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

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
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: hasLength({ min: 3, max: 20 }, "От 3 до 20 символов"),
      password: hasLength({ min: 6 }, "Не менее 6 символов"),
      confirmPassword: matchesField("password", "Пароли должны совпадать"),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(() => {})}
    >
      <TextInput
        maw={320}
        mx="auto"
        withAsterisk
        label="Имя пользователя"
        placeholder=""
        name="name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <PasswordInput
        maw={320}
        mx="auto"
        placeholder="Введите пароль"
        visibilityToggleIcon={VisibilityToggleIcon}
        label="Пароль"
        name="password"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <PasswordInput
        maw={320}
        mx="auto"
        placeholder="Подтвердите пароль"
        visibilityToggleIcon={VisibilityToggleIcon}
        label="Подтвердите пароль"
        name="confirmPassword"
         key={form.key('confirmPassword')}
        {...form.getInputProps('confirmPassword')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Зарегистрироваться</Button>
      </Group>
    </form>
  );
}
export default Login;
