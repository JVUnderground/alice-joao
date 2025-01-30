class Swipeable {
    private touchStartX: number | null = null;
    private touchEndX: number | null = null;
    private onSwipeLeft: () => void;
    private onSwipeRight: () => void;

    constructor(onSwipeLeft: () => void, onSwipeRight: () => void) {
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;
    }

    handleTouchStart = (e: React.TouchEvent) => {
        this.touchStartX = e.targetTouches[0].clientX;
    };

    handleTouchMove = (e: React.TouchEvent) => {
        this.touchEndX = e.targetTouches[0].clientX;
    };

    handleTouchEnd = () => {
        if (this.touchStartX !== null && this.touchEndX !== null) {
            const touchDiff = this.touchStartX - this.touchEndX;
            if (touchDiff > 50) {
                this.onSwipeLeft();
            } else if (touchDiff < -50) {
                this.onSwipeRight();
            }
        }
        this.touchStartX = null;
        this.touchEndX = null;
    };
}

export default Swipeable;