import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

export default function Wordmark({ size = 96, className = '' }: Props) {
  return (
    <svg id="wordmark" data-name="wordmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 497.19" width={size} fill="current" stroke="current" className={className}>
      <g>
        <path fill="currentColor" className="cls-1" d="M109.67,413.89c-23.53,0-43.53-4.16-59.99-12.49-16.47-8.32-33.03-19.55-49.68-33.66l23.89-28.77c12.3,11.59,25.15,20.82,38.55,27.69,13.39,6.88,29.5,10.32,48.32,10.32,9.04,0,18.1-1.09,27.15-3.26,9.04-2.17,16.64-4.52,22.8-7.06l60.81-25.52v-153.1l-46.15,19c-8.33,3.62-18.37,6.79-30.13,9.5-11.77,2.71-23.62,4.07-35.56,4.07-23.53,0-43.53-4.16-59.99-12.49-16.47-8.32-33.03-19.55-49.68-33.66l23.89-28.77c12.3,11.59,25.15,20.82,38.55,27.69,13.39,6.88,29.5,10.32,48.32,10.32,9.04,0,18.1-1.09,27.15-3.26,9.04-2.17,16.64-4.52,22.8-7.06l142.79-59.72c8.32-3.61,19.45-7.33,33.39-11.13,13.93-3.8,26.87-5.7,38.82-5.7,20.27,0,38.36,2.26,54.29,6.79,15.92,4.53,32.21,11.32,48.86,20.36l-16.83,33.12c-14.48-7.6-28.15-13.39-40.99-17.37-12.85-3.98-27.24-5.97-43.16-5.97-9.05,0-19.73,1.54-32.03,4.61-12.31,3.08-21.54,6.06-27.69,8.96l-54.83,23.35v153.1l40.18-16.83c8.32-3.61,19.45-7.33,33.39-11.13,13.93-3.8,26.87-5.7,38.82-5.7,20.27,0,38.36,2.27,54.29,6.79,15.92,4.53,32.21,11.32,48.86,20.36l-16.83,33.12c-14.48-7.6-28.15-13.39-40.99-17.37-12.85-3.98-27.24-5.97-43.16-5.97-9.05,0-19.73,1.54-32.03,4.61-12.31,3.08-21.54,6.07-27.69,8.96l-142.79,59.72c-8.33,3.62-18.37,6.79-30.13,9.5-11.77,2.71-23.62,4.07-35.56,4.07Z"/>
        <path fill="currentColor" className="cls-1" d="M243.71,497.19c-7.96,0-14.66-2.54-20.09-7.6-5.43-5.07-8.14-12.67-8.14-22.8s2.71-18.19,8.14-23.07c5.43-4.89,12.13-7.33,20.09-7.33,7.24,0,13.67,2.44,19.27,7.33,5.62,4.89,8.42,12.57,8.42,23.07s-2.8,17.73-8.42,22.8c-5.61,5.06-12.03,7.6-19.27,7.6Z"/>
      </g>
      <g>
        <path fill="currentColor" className="cls-1" d="M1239.48,481.99v-36.92h17.37c27.87,0,52.03-2.26,72.48-6.79,20.44-4.52,36.37-12.12,47.78-22.8,11.4-10.67,17.1-25.06,17.1-43.16,0-6.87-1.9-14.57-5.7-23.07-3.8-8.5-11.04-15.83-21.72-21.99-10.68-6.15-26.52-9.23-47.51-9.23h-40.18v-36.92h24.98c18.82,0,34.11-2.99,45.88-8.96,11.76-5.97,20.36-13.57,25.79-22.8,5.43-9.23,8.14-18.91,8.14-29.05,0-14.12-4.44-26.15-13.3-36.1-8.87-9.95-23.26-14.93-43.16-14.93-18.82,0-36.65,6.51-53.48,19.55-16.83,13.03-32.3,30.22-46.42,51.58-21.72,32.58-43.16,68.87-64.34,108.86-21.17,40-44.98,82.44-71.39,127.31h-36.38l-1.09-307.29h-82.52v-36.92h69.49c17.01,0,29.32,1.72,36.92,5.16,7.6,3.44,12.49,8.51,14.66,15.2,2.17,6.7,3.26,15.12,3.26,25.25l1.09,216.63h1.09c17.37-35.83,33.3-67.14,47.78-93.93,14.47-26.78,29.32-51.93,44.52-75.47,18.82-28.95,39.54-51.66,62.16-68.14,22.62-16.47,48.95-24.7,78.99-24.7s51.85,7.6,68.68,22.8c16.83,15.2,25.25,35.11,25.25,59.72,0,17.02-3.44,32.3-10.32,45.88-6.88,13.57-19.37,24.53-37.46,32.85,16.64,4.71,30.49,14.21,41.53,28.5,11.04,14.3,16.56,31.04,16.56,50.22,0,34.75-13.67,61.71-40.99,80.9-27.33,19.19-71.76,28.77-133.29,28.77h-22.26Z"/>
        <path fill="currentColor" className="cls-1" d="M1370.87,94.89c-7.96,0-14.66-2.53-20.09-7.6-5.43-5.06-8.14-12.67-8.14-22.8s2.71-18.19,8.14-23.07c5.43-4.89,12.13-7.33,20.09-7.33,7.25,0,13.67,2.44,19.27,7.33,5.62,4.89,8.42,12.58,8.42,23.07s-2.8,17.74-8.42,22.8c-5.61,5.07-12.03,7.6-19.27,7.6Z"/>
      </g>
      <g>
        <path fill="currentColor" className="cls-1" d="M1723.46,481.99v-36.92h17.37c27.87,0,52.03-2.26,72.48-6.79,20.44-4.52,36.37-12.12,47.78-22.8,11.4-10.67,17.1-25.06,17.1-43.16,0-6.87-1.9-14.57-5.7-23.07-3.8-8.5-11.04-15.83-21.72-21.99-10.68-6.15-26.52-9.23-47.51-9.23h-40.18v-36.92h24.98c18.82,0,34.11-2.99,45.88-8.96,11.76-5.97,20.36-13.57,25.79-22.8,5.43-9.23,8.14-18.91,8.14-29.05,0-14.12-4.44-26.15-13.3-36.1-8.87-9.95-23.26-14.93-43.16-14.93-18.82,0-36.65,6.51-53.48,19.55-16.83,13.03-32.3,30.22-46.42,51.58-21.72,32.58-43.16,68.87-64.34,108.86-21.17,40-44.98,82.44-71.39,127.31h-36.38l-1.09-307.29h-82.52v-36.92h69.49c17.01,0,29.32,1.72,36.92,5.16,7.6,3.44,12.49,8.51,14.66,15.2,2.17,6.7,3.26,15.12,3.26,25.25l1.09,216.63h1.09c17.37-35.83,33.3-67.14,47.78-93.93,14.47-26.78,29.32-51.93,44.52-75.47,18.82-28.95,39.54-51.66,62.16-68.14,22.62-16.47,48.95-24.7,78.99-24.7s51.85,7.6,68.68,22.8c16.83,15.2,25.25,35.11,25.25,59.72,0,17.02-3.44,32.3-10.32,45.88-6.88,13.57-19.37,24.53-37.46,32.85,16.64,4.71,30.49,14.21,41.53,28.5,11.04,14.3,16.56,31.04,16.56,50.22,0,34.75-13.67,61.71-40.99,80.9-27.33,19.19-71.76,28.77-133.29,28.77h-22.26Z"/>
        <path fill="currentColor" className="cls-1" d="M1854.85,94.89c-7.96,0-14.66-2.53-20.09-7.6-5.43-5.06-8.14-12.67-8.14-22.8s2.71-18.19,8.14-23.07c5.43-4.89,12.13-7.33,20.09-7.33,7.25,0,13.67,2.44,19.27,7.33,5.62,4.89,8.42,12.58,8.42,23.07s-2.8,17.74-8.42,22.8c-5.61,5.07-12.03,7.6-19.27,7.6Z"/>
      </g>
      <g>
        <path fill="currentColor" className="cls-1" d="M709.11,456.35l-33.66-17.92c8.69-15.56,17.91-27.96,27.69-37.19,9.77-9.23,19.18-16.74,28.23-22.53,3.61-2.17,5.43-3.98,5.43-5.43s-3.26-3.44-9.77-5.97c-6.16-2.53-12.22-4.97-18.19-7.33-5.97-2.35-10.86-5.7-14.66-10.04-3.8-4.34-5.7-10.49-5.7-18.46,0-7.24,1.71-13.21,5.16-17.92,3.44-4.7,7.24-8.42,11.4-11.13,4.16-2.71,7.33-4.61,9.5-5.7,3.98-1.81,7.6-3.53,10.86-5.16,3.26-1.63,4.89-2.99,4.89-4.07,0-1.44-3.26-3.44-9.77-5.97-10.5-3.98-19-9.41-25.52-16.29-6.52-6.87-9.77-15.74-9.77-26.6,0-16.29,3.8-31.12,11.4-44.52-14.48,6.88-30.13,13.12-46.96,18.73-16.83,5.62-34.48,8.42-52.94,8.42-23.53,0-43.53-4.16-59.99-12.49-16.47-8.32-33.03-19.55-49.68-33.66l24.43-29.32c12.3,11.59,25.25,20.9,38.82,27.96,13.57,7.06,29.4,10.59,47.51,10.59,15.2,0,33.03-3.89,53.48-11.67,20.44-7.78,39.9-16.56,58.36-26.33,28.23-14.84,53.29-25.33,75.19-31.49,21.9-6.15,41.89-9.23,59.99-9.23,20.27,0,38.36,2.27,54.29,6.79,15.92,4.53,32.21,11.32,48.86,20.36l-18.32,32.72c-14.48-7.6-26.65-12.99-39.5-16.97-12.85-3.98-27.24-5.97-43.16-5.97-25.71,0-47.69,4.16-65.97,12.49-18.28,8.33-32.22,19.19-41.81,32.58-9.59,13.39-14.39,27.88-14.39,43.43,0,5.79,2.08,10.23,6.24,13.3,4.16,3.08,10.04,6.07,17.64,8.96,10.49,3.99,18.37,8.42,23.62,13.3,5.24,4.89,7.87,10.95,7.87,18.19s-4.17,13.67-12.49,19.27c-8.33,5.62-16.29,10.77-23.89,15.47-4.71,2.9-7.79,5.16-9.23,6.79-1.45,1.63-2.17,2.81-2.17,3.53,0,1.09,1.63,2.26,4.89,3.53,3.26,1.27,6.7,2.81,10.32,4.61,9.41,3.99,18.09,8.06,26.06,12.22,7.96,4.16,11.94,10.59,11.94,19.27,0,7.97-2.54,14.93-7.6,20.9-5.07,5.97-12.31,12.04-21.72,18.19-7.96,5.07-15.93,11.32-23.89,18.73-7.96,7.42-15.74,17.1-23.34,29.05Z"/>
        <path fill="currentColor" className="cls-1" d="M567.62,144.22l-35.41-23.01c5.92-9.11,73.84-121.21,151.92-121.21,71.37,0,136.78,48.56,148.91,110.56l-41.44,8.11c-8.25-42.15-56.46-76.44-107.47-76.44-54.3,0-110.24,92.32-116.52,101.99Z"/>
        <path fill="currentColor" className="cls-1" d="M799.39,252.56l-37.45-19.51c41.65-79.97,152.32-107.65,157.01-108.79l10.72,41.23-5.74-20.71,5.74,20.71c-.96.24-97.55,24.22-130.29,87.07Z"/>
        <path fill="currentColor" className="cls-1" d="M653.22,148.81c-7.96,0-14.66-2.54-20.09-7.6-5.43-5.07-8.14-12.67-8.14-22.8s2.71-18.19,8.14-23.07c5.43-4.89,12.13-7.33,20.09-7.33,7.24,0,13.67,2.44,19.27,7.33,5.62,4.89,8.42,12.57,8.42,23.07s-2.8,17.73-8.42,22.8c-5.61,5.06-12.03,7.6-19.27,7.6Z"/>
      </g>
    </svg>
  )
}