interface Props {
  size?: number;
  className?: string;
}

export function BaybayinWa({ size = 36, className = '' }: Props) {
  return (
    <svg
      id="baybayin-wa"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1865.87 1920"
      width={size}
      fill="current"
      stroke="current"
      className={className}
    >
      <path
        fill="currentColor"
        className="cls-1"
        d="M834.66,1920c-146.26,0-257.36-38.9-333.29-116.8-75.98-77.85-113.95-183.25-113.95-316.2,0-66.45,8.06-141.94,24.21-226.47,16.11-84.48,30.85-159.97,44.15-226.47,7.57-32.27,12.33-62.67,14.24-91.16,1.87-28.49,2.85-57.91,2.85-88.31H0v-193.71h401.66c108.25,0,183.74,18.52,226.47,55.55,42.73,37.03,64.09,92.58,64.09,166.65,0,55.1-7.12,113.01-21.36,173.77-14.24,60.8-28.49,124.9-42.73,192.28-14.24,67.43-21.36,140.07-21.36,217.92,0,91.16,20.88,157.17,62.67,197.98,41.75,40.86,102.55,61.25,182.31,61.25s151.91-23.72,227.89-71.22c75.93-47.45,147.64-111.54,215.07-192.28,67.39-80.7,127.7-170.92,180.89-270.62,53.15-99.7,94.94-202.7,125.34-309.08,30.36-106.34,45.58-207.95,45.58-304.81,0-115.82-27.06-208.89-81.18-279.17-54.12-70.24-142.92-105.4-266.35-105.4-77.89,0-150.04,17.09-216.5,51.28-66.5,34.18-123.47,81.68-170.92,142.43l-145.28-125.34c60.76-77.85,135.76-141.01,225.04-189.44C1080.58,24.21,1187.89,0,1313.23,0c106.34,0,201.28,19.94,284.87,59.82,83.54,39.88,149.06,102.55,196.56,188.01,47.45,85.46,71.22,197.54,71.22,336.14,0,117.77-18.52,238.84-55.55,363.2-37.03,124.41-88.8,244.54-155.25,360.36-66.5,115.86-143.41,219.84-230.74,311.93-87.37,92.14-181.38,165.22-282.02,219.35-100.68,54.12-203.23,81.19-307.66,81.19Z"
      />
    </svg>
  );
}
