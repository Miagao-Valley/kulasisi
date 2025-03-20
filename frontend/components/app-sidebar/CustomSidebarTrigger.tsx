import { useSidebar, SIDEBAR_KEYBOARD_SHORTCUT } from '../ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

export default function CustomSidebarTrigger() {
  const { isMobile, open, toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full w-fit h-fit p-1"
          onClick={toggleSidebar}
        >
          {isMobile || !open ? <PanelRightClose /> : <PanelRightOpen />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isMobile || !open ? 'Open sidebar' : 'Close sidebar'} (<kbd>Ctrl</kbd>{' '}
        + <kbd>{SIDEBAR_KEYBOARD_SHORTCUT.toUpperCase()}</kbd>)
      </TooltipContent>
    </Tooltip>
  );
}
