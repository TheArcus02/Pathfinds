import { IconType } from 'react-icons/lib';

interface IActionButton {
  disabled?: boolean;
  buttonColor?: string;
  disabledColor?: string;
  textColor?: string;
  hoverColor: string;
  action: () => void;
  Icon?: IconType;
  iconSize?: string;
  iconColor?: string;
  text?: string;
  HideTextOnSm?: boolean;
}

const ActionButton: React.FC<IActionButton> = ({
  disabled,
  buttonColor,
  disabledColor,
  textColor,
  hoverColor,
  action,
  Icon,
  iconSize,
  iconColor,
  text,
  HideTextOnSm,
}) => {
  return (
    <button
      type='button'
      disabled={disabled}
      className={`text-${
        textColor || 'black'
      } ease-in duration-150 border-[1px] border-zinc-800 font-light md:font-medium rounded-lg text-sm px-1 md:px-5 py-0.5 md:py-2.5 focus:outline-none ${
        !disabled
          ? `bg-${buttonColor} hover:bg-${hoverColor} cursor-pointer`
          : `bg-${disabledColor || 'gray-400'}`
      }`}
      onClick={action}
    >
      <div className={`${Icon && 'flex gap-2 items-center'} w-full`}>
        {Icon && (
          <Icon
            className={`${
              HideTextOnSm ? 'w-full md:w-auto' : 'mr-1'
            } text-${iconColor} text-md md:text-lg `}
            size={iconSize}
          />
        )}
        <div className={HideTextOnSm ? 'hidden md:block' : ''}>{text}</div>
      </div>
    </button>
  );
};

export default ActionButton;
