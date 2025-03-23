import { useSidebar, SIDEBAR_KEYBOARD_SHORTCUT } from '../ui/sidebar';
import { Kbd, Keys, useKbd } from '../ui/kbd';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

export function CustomSidebarTrigger() {
  const { isMobile, open, toggleSidebar } = useSidebar();
  const { os } = useKbd();

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
      <TooltipContent className="flex items-center gap-1">
        {isMobile || !open ? 'Open sidebar' : 'Close sidebar'}
        <div className="flex items-center gap-[2px]">
          <Kbd keyName={os === 'mac' ? Keys.Command : Keys.Control} />
          <Kbd keyName={SIDEBAR_KEYBOARD_SHORTCUT.toUpperCase()} />
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
