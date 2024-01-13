import {
  ErrorMessage,
  Formik,
  useFormikContext,
  Field,
  FieldProps,
  Form,
  useField,
} from "formik";
import {
  ChangeEvent,
  Component,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  HTMLInputTypeAttribute,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import * as Yup from "yup";

export const SubmitForm = (id: string, cb: () => void) => {
  dispatchEvent(new CustomEvent(`${id}-submitted`, { detail: cb }));
};

type FieldPropz<T> = {
  name: T;
} & FormFieldProps;

export type FormFieldProps = {
  as?: ElementType;
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  id?: any;
  autoComplete?: any;
  placeholder?: any;
  className?: any;
  children?: ReactNode;
};

const _Field = <T extends string>(props: FieldPropz<T>) => {
  return <FormField {...props} />;
};

export type ExtractYupObjectType<T extends Yup.AnyObjectSchema> =
  T extends Yup.ObjectSchema<infer U> ? U : never;

type FormOps = {
  resetForm: () => any;
};

type FormPropz<T extends Yup.AnyObjectSchema> = {
  id?: string;
  schema: T;
  initialValues?: any;
  onChange?: (data: any) => void;
  afterInit?: (formOps: any) => void;
  onSubmit?: (v: ExtractYupObjectType<T>, helpers: any) => void | Promise<any>;
  render: (
    hoc: FC<{ name: keyof T["fields"] } & FormFieldProps>,
    data: ExtractYupObjectType<T>,
    helpers: {
      submitForm: () => void;
      resetForm: () => void;
      isSubmitting: boolean;
      setField: (field: keyof T["fields"], value: any) => void;
    }
  ) => ReactElement;
};

const FormObserver = ({
  onChange,
  afterInit,
  id,
}: {
  onChange: ((data: any) => void) | undefined;
  afterInit: FormPropz<any>["afterInit"];
  id?: string;
}) => {
  const { values, errors, resetForm, submitForm } = useFormikContext();

  useEffect(() => {
    onChange && onChange(values);
  }, [values]);

  useEffect(() => {
    afterInit &&
      afterInit({ resetForm, submitForm, getErrors: () => errors, values });
  }, [resetForm]);

  return null;
};
const EdgeForm = <T extends Yup.AnyObjectSchema>({
  render,
  schema,
  initialValues,
  afterInit,
  onSubmit,
  onChange,
  id,
}: FormPropz<T>) => {
  return (
    <Formik
      id={id}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={
        onSubmit
          ? (values, helpers) => {
              const res = onSubmit(values, helpers);
              if (res instanceof Promise) {
                res.catch((e) => {
                  if (e.response?.data?.errors) {
                    helpers.setErrors(e.response?.data?.errors);
                  }
                });
              }
            }
          : () => {}
      }
    >
      {({
        values,
        touched,
        dirty,
        errors,
        submitForm,
        resetForm,
        isSubmitting,
        setFieldValue,
      }) => {
        return (
          <Form id={id}>
            <FormObserver id={id} onChange={onChange} afterInit={afterInit} />

            {render(
              _Field as string extends keyof T
                ? never
                : FC<{ name: keyof T["fields"] } & FormFieldProps>,
              values,
              {
                submitForm,
                resetForm,
                isSubmitting,
                setField: (field: keyof T["fields"], value: any) => {
                  setFieldValue(field.toString(), value);
                },
              }
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

// I dont want to export this
const FormField = ({
  type = "text",
  as = "input",
  name,
  id,
  label,
  autoComplete,
  placeholder,
  className,
  children,
}: FormFieldProps) => {
  const { errors, values = {} } = useFormikContext<any>();
  const [_field, _meta, _helpers] = useField(name);

  const el = useRef<HTMLInputElement>(null);

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`block text-sm ${
          name in errors ? "text-red-800" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      <div className="">
        {type == "file" ? (
          <div
            onClick={() => el.current && el.current?.click()}
            className={`block cursor-pointer focus:outline-none transition-all duration-100 w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${className}  ${
              name in errors
                ? "border-red-600 border ring-red-600 focus:ring-red-600"
                : "focus:ring-indigo-600 ring-gray-300"
            }`}
          >
            {_field.value?.name}
            {children}
            <input
              ref={el}
              className="hidden"
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files?.length) {
                  _helpers.setValue(event.currentTarget.files[0]);
                }
              }}
            />{" "}
          </div>
        ) : (
          <Field
            name={name}
            id={id}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={values[name] || ""}
          >
            {({ field, meta, form, ...props }: FieldProps<any>) => (
              <Text
                {...field}
                type={type}
                className={`block focus:outline-none transition-all duration-100 w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${className}  ${
                  name in errors
                    ? "border-red-600 border ring-red-600 focus:ring-red-600"
                    : "focus:ring-indigo-600 ring-gray-300"
                }`}
                {...props}
                as={as}
              >
                {children}
              </Text>
            )}
          </Field>
        )}
        <ErrorMessage
          name={name}
          component="div"
          className=" px-1 text-xs text-red-800"
        />
      </div>
    </div>
  );
};

export default EdgeForm;

type Rainbow =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type TextProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  { color?: Rainbow | "black" }
>;

type TextComponent = <C extends ElementType = "span">(
  props: TextProps<C>
) => ReactElement | null;

// eslint-disable-next-line react/display-name
export const Text = forwardRef(
  <C extends ElementType = "span">(
    { as, color, children, ...props }: TextProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "span";

    const style = color ? { style: { color } } : {};

    return (
      <Component {...props} {...style} ref={ref}>
        {children}
      </Component>
    );
  }
);
