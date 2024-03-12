import classNames from 'classnames';

const widths = {
  lg: 'max-w-7xl',
  xl: 'max-w-8xl',
};

interface Props {
  title: string;
  children: React.ReactNode;
  width?: keyof typeof widths;
}

function ContentLayout({ children, title, width = 'lg' }: Props) {
  return (
    <div className="py-6">
      <div
        className={classNames('mx-auto px-4 sm:px-6 md:px-8', widths[width])}
      >
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div
        className={classNames('mx-auto px-4 sm:px-6 md:px-8', widths[width])}
      >
        {children}
      </div>
    </div>
  );
}

export default ContentLayout;
