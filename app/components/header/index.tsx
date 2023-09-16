import AccountDropdown from './account-dropdown'
import { WorkspaceProvider } from '@/context/workspace-context'

const Header = () => {
  return (

    <div className='flex flex-row-reverse bg-white' style={{ width: '100%' }}>
      <WorkspaceProvider>
        <AccountDropdown />
      </WorkspaceProvider>
    </div>

  )
}
export default Header
