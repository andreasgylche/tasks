import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-xl outline-none hover:bg-neutral-200 focus:ring focus:ring-violet-700 dark:hover:bg-neutral-900"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='"h-5 w-5 text-neutral-900 dark:text-neutral-100' />
      ) : (
        <MoonIcon className='"h-5 w-5 text-neutral-900 dark:text-neutral-100' />
      )}
      <span className="sr-only">
        {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  )
}
