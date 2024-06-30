import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <GlobalContext.Provider value={{ isActive, setIsActive, isModalOpen, setIsModalOpen }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
