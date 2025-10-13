'use client'

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react"
import {
  Book,
  ChevronRight,
} from "lucide-react"
import { SiReact, SiNextdotjs } from "react-icons/si"

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right"
type Position = { x: number; y: number }

type MenuItem = {
  label: string
  icon: React.ComponentType<{ size?: number }>
  href?: string
  type: "main" | "sub"
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { label: "React Demo", icon: SiReact, href: "/react-demo", type: "main" },
  { label: "Next.js Demo", icon: SiNextdotjs, href: "/nextjs-demo", type: "main" },
]

// Memoized corner highlights to prevent re-renders during dragging
const CornerHighlights = React.memo(() => (
  <>
    <div className="fixed top-2 left-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-tl-lg opacity-40" />
    <div className="fixed top-2 right-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-tr-lg opacity-40" />
    <div className="fixed bottom-2 left-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-bl-lg opacity-40" />
    <div className="fixed bottom-2 right-2 w-10 h-10 border-2 border-dashed border-neutral-700 rounded-br-lg opacity-40" />
  </>
))
CornerHighlights.displayName = 'CornerHighlights'

export default function DraggableFavButton() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 })
  const [corner, setCorner] = useState<Corner>("bottom-right")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false) // ✅ fixed name

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const dragThreshold = 5
  const hasDraggedRef = useRef(false)
  const dragPosRef = useRef<Position>({ x: 0, y: 0 }) // Track position during drag without re-renders

  // Define all callbacks first
  const getPositionFromCorner = useCallback((corner: Corner): Position => {
    if (typeof window === "undefined") return { x: 0, y: 0 }
    const margin = 20
    const buttonSize = 44
    switch (corner) {
      case "top-left":
        return { x: margin, y: margin }
      case "top-right":
        return { x: window.innerWidth - buttonSize - margin, y: margin }
      case "bottom-left":
        return { x: margin, y: window.innerHeight - buttonSize - margin }
      case "bottom-right":
        return {
          x: window.innerWidth - buttonSize - margin,
          y: window.innerHeight - buttonSize - margin,
        }
    }
  }, [])

  const getClosestCorner = useCallback((x: number, y: number): Corner => {
    if (typeof window === "undefined") return "bottom-right"
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    if (x < centerX && y < centerY) return "top-left"
    if (x >= centerX && y < centerY) return "top-right"
    if (x < centerX && y >= centerY) return "bottom-left"
    return "bottom-right"
  }, [])

  const getDropdownPosition = useCallback(() => {
    switch (corner) {
      case "top-left":
        return { top: 60, left: 20 }
      case "top-right":
        return { top: 60, right: 25 }
      case "bottom-left":
        return { bottom: 70, left: 20 }
      case "bottom-right":
        return { bottom: 70, right: 25 }
    }
  }, [corner])

  const getSubmenuPosition = useCallback(() => {
    switch (corner) {
      case "top-left":
        return { top: 0, left: '100%' }
      case "top-right":
        return { top: 0, right: '100%' }
      case "bottom-left":
        return { bottom: 0, left: '100%' }
      case "bottom-right":
        return { bottom: 0, right: '100%' }
    }
  }, [corner])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (menuOpen) return
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    dragPosRef.current = { x: rect.left, y: rect.top } // Initialize ref position
    hasDraggedRef.current = false
  }, [menuOpen])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragStart.x === 0 && dragStart.y === 0) return
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    const deltaX = Math.abs(e.clientX - currentPos.x - dragStart.x)
    const deltaY = Math.abs(e.clientY - currentPos.y - dragStart.y)
    if (!isDragging && (deltaX > dragThreshold || deltaY > dragThreshold)) {
      setIsDragging(true)
      hasDraggedRef.current = true
      // Set initial position on DOM when drag starts
      if (buttonRef.current) {
        buttonRef.current.style.left = `${currentPos.x}px`
        buttonRef.current.style.top = `${currentPos.y}px`
      }
    }
    if (isDragging) {
      // Update ref and DOM directly - no re-render!
      dragPosRef.current = { x: newX, y: newY }
      if (buttonRef.current) {
        buttonRef.current.style.left = `${newX}px`
        buttonRef.current.style.top = `${newY}px`
      }
    }
  }, [dragStart, isDragging, currentPos])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      // Use the ref position for calculation
      const centerX = dragPosRef.current.x + 22
      const centerY = dragPosRef.current.y + 22
      const newCorner = getClosestCorner(centerX, centerY)
      const snapPos = getPositionFromCorner(newCorner)

      // First, sync state with current dragged position
      setCurrentPos(dragPosRef.current)
      setIsDragging(false)
      setDragStart({ x: 0, y: 0 })

      // Clear direct DOM manipulation so React takes over
      if (buttonRef.current) {
        buttonRef.current.style.left = ''
        buttonRef.current.style.top = ''
      }

      // Use requestAnimationFrame to snap to corner in next frame with transition
      requestAnimationFrame(() => {
        setCorner(newCorner)
        setCurrentPos(snapPos)
        setIsTransitioning(true)
        setTimeout(() => setIsTransitioning(false), 300)
      })
    } else {
      setIsDragging(false)
      setDragStart({ x: 0, y: 0 })
    }
  }, [isDragging, getClosestCorner, getPositionFromCorner])

  const handleClick = useCallback(() => {
    if (!hasDraggedRef.current && !isDragging) setMenuOpen(!menuOpen)
  }, [isDragging, menuOpen])

  // Initialize - runs once on mount
  useEffect(() => {
    const savedCorner = localStorage.getItem("buttonCorner") as Corner
    if (savedCorner) {
      setCorner(savedCorner)
      setCurrentPos(getPositionFromCorner(savedCorner))
    } else {
      setCurrentPos(getPositionFromCorner("bottom-right"))
    }
    setIsInitialized(true)
  }, [getPositionFromCorner])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("buttonCorner", corner)
    }
  }, [corner, isInitialized])

  useEffect(() => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [dragStart, isDragging, currentPos, handleMouseMove, handleMouseUp])

  useEffect(() => {
    const handleResize = () => setCurrentPos(getPositionFromCorner(corner))
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [corner, getPositionFromCorner])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!buttonRef.current?.contains(e.target as Node) && menuOpen) {
        const dropdownElement = document.querySelector(".dropdown-menu")
        if (!dropdownElement?.contains(e.target as Node)) setMenuOpen(false)
      }
    }
    if (!menuOpen) {
      setSubMenuOpen(false)
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  const dropdownStyle = useMemo(() => getDropdownPosition(), [getDropdownPosition])
  const submenuStyle = useMemo(() => getSubmenuPosition(), [getSubmenuPosition])

  // Only let React control position when NOT dragging (direct DOM manipulation during drag)
  const buttonStyle = useMemo(() => ({
    ...(isDragging ? {} : { left: `${currentPos.x}px`, top: `${currentPos.y}px` }),
    opacity: isDragging ? 0.6 : 1,
  }), [isDragging, currentPos])

  if (!isInitialized) return null

  return (
    <>
      {/* Floating draggable button */}
      <button
        ref={buttonRef}
        className={`fixed w-9 h-9 bg-neutral-900 text-white border border-neutral-700 flex z-[3000] items-center justify-center rounded-full shadow-md hover:border-neutral-500 hover:bg-neutral-800 ${isDragging ? "cursor-grabbing" : "cursor-grab"
          } ${isTransitioning ? "transition-all duration-300 ease-out" : ""}`}
        style={buttonStyle}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="floating-menu"
      >
        <Book size={15} aria-hidden="true" />
      </button>

      {/* Dropdown menu */}
      {menuOpen && !isDragging && (
        <div
          id="floating-menu"
          className="dropdown-menu fixed w-48 dark:bg-neutral-900 bg-white overflow-hidden text-black dark:text-white border dark:border-neutral-700 border-neutral-200 rounded-lg shadow-lg z-[2999] animate-fade-in"
          style={dropdownStyle}
          role="menu"
          aria-labelledby="menu-title"
        >
          <div className="">
            <h3 id="menu-title" className="font-semibold text-sm p-3">Menu</h3>
            <hr />
            <ul className="space-y-1 text-sm" role="menu">
              {menuItems.map((item, i) =>
                item.type === "main" ? (
                  <li
                    key={i}
                    className="px-2 py-2  hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer flex items-center gap-2"
                    role="none"
                  >
                    <item.icon size={14} aria-hidden="true" />
                    <a href={item.href} role="menuitem">{item.label}</a>
                  </li>
                ) : (
                  <li key={i} className="relative group" role="none">
                    <div
                      className="px-2 py-2 rounded-md dark:hover:bg-neutral-800 hover:bg-neutral-200 cursor-pointer flex items-center gap-2"
                      onClick={() => setSubMenuOpen(!subMenuOpen)}
                      role="menuitem"
                      aria-expanded={subMenuOpen}
                      aria-haspopup="menu"
                    >
                      <item.icon size={14} aria-hidden="true" />
                      {item.label}
                      <ChevronRight className="ml-auto" size={14} aria-hidden="true" />
                    </div>
                    {/* Submenu */}
                    <ul
                      className={`absolute ml-1 max-w-max  dark:bg-neutral-800 bg-white border dark:border-neutral-700 border-neutral-200 rounded-md shadow-lg ${menuOpen && subMenuOpen ? "block" : "hidden"
                        }`}
                      style={submenuStyle}
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      {item.children?.map((child, j) => (
                        <React.Fragment key={j}>
                          <li
                            key={j}
                            className="px-2 py-2.5 rounded-md whitespace-nowrap  dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer flex items-center gap-2"
                            role="none"
                          >
                            <child.icon size={14} aria-hidden="true" />
                            <a href={child.href} role="menuitem">{child.label}</a>
                          </li>
                          {j !== (item.children?.length ?? 0) - 1 && (
                            <hr />
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Corner highlight boxes while dragging */}
      {isDragging && <CornerHighlights />}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.18s ease-out;
        }
      `}</style>
    </>
  )
}
