import { useCallback, useState } from 'react'
import useRouteChangeEvents from './useRouteChangeEvents'
import Confirm from '@/app/components/base/confirm'

const useLeaveConfirmation = (shouldPreventRouteChange: boolean) => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      setShowConfirmationDialog(true)
      return false
    }

    return true
  }, [shouldPreventRouteChange])

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange })

  return {
    confirmationDialog: (
      <Confirm title={'App not published'}
        content={'Are you sure you want to leave? All the unsaved changes will be lost.'}
        isShow={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        onConfirm={() => {
          allowRouteChange()
        }}
        onCancel={() => setShowConfirmationDialog(false)}
      />
    ),
  }
}

export default useLeaveConfirmation
