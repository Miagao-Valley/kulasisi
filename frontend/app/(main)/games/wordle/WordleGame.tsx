import { useWordleContext } from './WordleContext';
import Board from './Board';
import Keyboard from './Keyboard';
import GameEndModal from './GameEndModal';
import { Spinner } from '@/components/ui/spinner';

export default function WordleGame() {
  const { loading, error } = useWordleContext();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center">{error.message}</div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center">
          <GameEndModal />
          <Board className="mb-5" />
          <Keyboard />
        </div>
      )}
    </>
  );
}
