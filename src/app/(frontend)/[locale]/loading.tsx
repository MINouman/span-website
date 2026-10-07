// Shown only if a page takes a moment to arrive (most pages are prebuilt and prefetched):
// a thin amber bar sweeps across the top, under the navbar's shadow, and the old content stays calm.
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="min-h-[60vh]">
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden">
        <div className="loading-bar h-full w-1/3 bg-amber" />
      </div>
    </div>
  )
}
