interface Props {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: Props) {
  return (
    <header className="mb-4">
      <h1 className="text-5xl">{title}</h1>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </header>
  );
}
