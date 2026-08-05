export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="container-shell text-center sm:text-left">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Zohaib. Built with intent.
        </p>
        <p className="mt-2 font-mono text-[10px] text-faint">
          React · Express · MongoDB
        </p>
      </div>
    </footer>
  )
}
