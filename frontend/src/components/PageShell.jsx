export default function PageShell({ children, testid }) {
  return (
    <main data-testid={testid} className="relative pt-[72px]">
      {children}
    </main>
  );
}
