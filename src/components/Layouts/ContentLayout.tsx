interface Props {
  title: string;
  children: React.ReactNode;
}

function ContentLayout({ children, title }: Props) {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
    </div>
  );
}

export default ContentLayout;
