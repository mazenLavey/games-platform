import classNames from "classnames";
import './index.css';

type Props = {
    type: string,
    name: string,
    id: string,
    value: string,
    placeholder: string,
    label: string,
    onChange: any,
    error?: boolean,
    disabled?: boolean,
    required?: boolean,
}

const FormInput:React.FC<Props> = ({
    type,
    name,
    id,
    value,
    placeholder,
    label,
    onChange,
    error = false,
    disabled = false,
    required = false,
}) => {

    return (
        <div className="FormInput">
            <label htmlFor={id} className="FormInput__label">
                {label}
            </label>
            <input
                className={classNames({
                    'FormInput__input': true,
                    'FormInput__input--error': error,
                })}
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            />
        </div>
    );
};

export default FormInput;