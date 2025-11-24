import SecondarySquareLink from "@/component/common/SecondarySquareLink";
import SimpleCard from "@/component/common/SimpleCard";
import getServerSessionUser from "@/hooks/useServerSessionUser";

async function FeaturesSection() {
  const user = await getServerSessionUser();
  return (
    <section className="px-4 pb-20 md:pb-32 mt-40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SimpleCard className="lg:col-span-2 glassmorphic rounded-4xl p-8 flex flex-col items-start shadow-card relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-blue-200/50 rounded-full blur-3xl opacity-50"></div>
          <div className="w-14 h-14 rounded-2xl dark:bg-dark-surface-alt flex items-center justify-center shadow-subtle  mb-4">
            <AiSvg />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-1 mt-4 text-light-fg dark:text-dark-fg">
            AI-Powered Generation
          </h3>
          <p className="text-light-fg-muted dark:text-dark-fg-muted mb-4">
            Describe your form in plain English, and our AI will generate the
            fields, logic, and design for you. It&apos;s like magic.
          </p>
          <SecondarySquareLink
            link={user ? "/dashboard/" + user.dashboard : "/login"}
          >
            Try Now
          </SecondarySquareLink>
        </SimpleCard>
        <SimpleCard className="rounded-4xl p-8 flex flex-col items-start">
          <div className="w-14 h-14 rounded-2xl p-3 dark:bg-dark-surface-alt flex items-center justify-center mb-4">
            <AnalyticsSvg />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-1 mt-4 text-light-fg dark:text-dark-fg">
            Form Analytics
          </h3>
          <p className="text-light-fg-muted dark:text-dark-fg-muted mb-4">
            Get insights into your form&apos;s performance with beautiful,
            easy-to-understand analytics.
          </p>
          <SecondarySquareLink
            link={user ? "/dashboard/" + user.dashboard : "/login"}
          >
            Try Now
          </SecondarySquareLink>
        </SimpleCard>
        <SimpleCard className="rounded-4xl p-8 flex flex-col items-start">
          <div className="w-14 h-14 rounded-2xl p-3 dark:bg-dark-surface-alt flex items-center justify-center shadow-subtle  mb-4">
            <IntegrationSvg />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-1 mt-4 text-light-fg dark:text-dark-fg">
            Third-Party Integrations
          </h3>
          <p className="text-light-fg-muted dark:text-dark-fg-muted mb-4">
            Connect your forms to the tools you already use, like Google Sheets,
            Mailchimp, and Slack.
          </p>
          <p>Comming Soon</p>
        </SimpleCard>
        <SimpleCard className="lg:col-span-2 glassmorphic rounded-4xl p-8 flex flex-col items-start shadow-card relative overflow-hidden">
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
          <div className="w-14 h-14 rounded-2xl p-3 dark:bg-dark-surface-alt flex items-center justify-center shadow-subtle  mb-4">
            <SubmissionSvg />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-1 mt-4 text-light-fg dark:text-dark-fg">
            Submission Management
          </h3>
          <p className="text-light-fg-muted dark:text-dark-fg-muted mb-4">
            View, manage, and export your form submissions from a single,
            beautiful dashboard that feels right at home on any device.
          </p>
          <SecondarySquareLink
            link={user ? "/dashboard/" + user.dashboard : "/login"}
          >
            Try Now
          </SecondarySquareLink>
        </SimpleCard>
      </div>
    </section>
  );
}

export default FeaturesSection;

const AiSvg = ({ width = 40 }: { width?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={width}
      viewBox="0 0 48 48"
    >
      <path
        fill="#2196f3"
        d="M23.426,31.911l-1.719,3.936c-0.661,1.513-2.754,1.513-3.415,0l-1.719-3.936	c-1.529-3.503-4.282-6.291-7.716-7.815l-4.73-2.1c-1.504-0.668-1.504-2.855,0-3.523l4.583-2.034	c3.522-1.563,6.324-4.455,7.827-8.077l1.741-4.195c0.646-1.557,2.797-1.557,3.443,0l1.741,4.195	c1.503,3.622,4.305,6.514,7.827,8.077l4.583,2.034c1.504,0.668,1.504,2.855,0,3.523l-4.73,2.1	C27.708,25.62,24.955,28.409,23.426,31.911z"
      ></path>
      <path
        fill="#7e57c2"
        d="M38.423,43.248l-0.493,1.131c-0.361,0.828-1.507,0.828-1.868,0l-0.493-1.131	c-0.879-2.016-2.464-3.621-4.44-4.5l-1.52-0.675c-0.822-0.365-0.822-1.56,0-1.925l1.435-0.638c2.027-0.901,3.64-2.565,4.504-4.65	l0.507-1.222c0.353-0.852,1.531-0.852,1.884,0l0.507,1.222c0.864,2.085,2.477,3.749,4.504,4.65l1.435,0.638	c0.822,0.365,0.822,1.56,0,1.925l-1.52,0.675C40.887,39.627,39.303,41.232,38.423,43.248z"
      ></path>
    </svg>
  );
};

const SubmissionSvg = ({ width = 40 }: { width?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={width}
      x="0"
      y="0"
      viewBox="0 0 58 58"
    >
      <g>
        <g fill="none" fillRule="evenodd">
          <rect
            width="40"
            height="16"
            x="9"
            y="42"
            fill="#4fb96f"
            rx="8"
            opacity="1"
            data-original="#4fb96f"
          ></rect>
          <rect
            width="58"
            height="16"
            y="21"
            fill="#3b96d2"
            rx="4"
            opacity="1"
            data-original="#3b96d2"
          ></rect>
          <rect
            width="58"
            height="16"
            fill="#3b96d2"
            rx="4"
            opacity="1"
            data-original="#3b96d2"
          ></rect>
          <path
            fill="#efc319"
            d="M16 27v4a2.006 2.006 0 0 1-2 2H6a2.006 2.006 0 0 1-2-2v-4a1.961 1.961 0 0 1 .68-1.49l4.11 3.09c.72.53 1.7.53 2.42 0l4.11-3.09c.433.374.682.918.68 1.49z"
            opacity="1"
            data-original="#efc319"
          ></path>
          <path
            fill="#f2d45b"
            d="m15.32 25.51-4.11 3.09c-.72.53-1.7.53-2.42 0l-4.11-3.09A1.94 1.94 0 0 1 6 25h8c.489-.002.96.18 1.32.51z"
            opacity="1"
            data-original="#f2d45b"
          ></path>
          <circle
            cx="10"
            cy="6"
            r="2"
            fill="#fcd6ac"
            opacity="1"
            data-original="#fcd6ac"
          ></circle>
          <path
            fill="#285680"
            d="M13 11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1 3 3 0 0 1 6 0z"
            opacity="1"
            data-original="#285680"
          ></path>
          <g fill="#fff">
            <path
              d="M26 28h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2zM52 32H21a1 1 0 0 1 0-2h31a1 1 0 0 1 0 2zM26 7h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2zM52 11H21a1 1 0 0 1 0-2h31a1 1 0 0 1 0 2zM26 54a1 1 0 0 1-.707-.293l-2-2a1 1 0 0 1 1.414-1.414l1.387 1.387L33.4 46.2a1 1 0 0 1 1.2 1.6l-8 6a.993.993 0 0 1-.6.2z"
              fill="#ffffff"
              opacity="1"
              data-original="#ffffff"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

const IntegrationSvg = ({ width = 40 }: { width?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={width}
      x="0"
      y="0"
      viewBox="0 0 512 512"
      className=""
    >
      <g>
        <path
          d="M495.105 307.299s-13.198 23.401-15 26.1c-3.898 7.202-13.198 9.6-20.4 5.7-2.999-1.8-23.099-13.2-25.499-15-8.101 6.901-17.401 12.601-28.2 16.501V361c0 8.399-6.599 15-15 15h-30c-8.401 0-15-6.601-15-15v-20.4c-10.8-3.9-20.099-9.6-28.2-16.501l-46.8 25.201-43.5 6.899 13.2-58.499 46.8-25.201c-.899-5.4-1.5-10.8-1.5-16.5s.601-11.1 1.8-16.5l-46.8-25.201-15.3-55.201 45.601 3.602 46.5 25.199c8.401-7.2 17.701-12.599 28.2-16.5V151c0-8.401 6.599-15 15-15h30c8.401 0 15 6.599 15 15v20.4c10.8 3.9 19.799 9.6 27.9 16.5h.3c2.999-1.8 23.101-13.2 25.499-15 7.202-3.9 16.201-1.5 20.4 5.4 0 0 13.2 23.401 15 26.1 4.2 7.2 1.802 16.5-5.4 20.7-3.3 1.5-23.099 12.601-25.499 14.401 1.199 5.4 1.8 10.8 1.8 16.5s-.601 11.1-1.5 16.5c3.3 1.5 22.8 12.599 25.199 14.399 7.201 4.199 9.599 13.199 5.399 20.399z"
          fill="#979fef"
          data-original="#979fef"
          className=""
        ></path>
        <path
          d="M495.105 307.299s-13.198 23.401-15 26.1c-3.898 7.202-13.198 9.6-20.4 5.7-2.999-1.8-23.099-13.2-25.499-15-8.101 6.901-17.401 12.601-28.2 16.501V361c0 8.399-6.599 15-15 15h-15V136h15c8.401 0 15 6.599 15 15v20.4c10.8 3.9 19.799 9.6 27.9 16.5h.3c2.999-1.8 23.101-13.2 25.499-15 7.202-3.9 16.201-1.5 20.4 5.4 0 0 13.2 23.401 15 26.1 4.2 7.2 1.802 16.5-5.4 20.7-3.3 1.5-23.099 12.601-25.499 14.401 1.199 5.4 1.8 10.8 1.8 16.5s-.601 11.1-1.5 16.5c3.3 1.5 22.8 12.599 25.199 14.399 7.202 4.199 9.6 13.199 5.4 20.399z"
          fill="#737ee6"
          data-original="#737ee6"
          className=""
        ></path>
        <path
          d="M255.105 442.299s-13.198 23.401-15 26.1c-3.898 7.202-13.198 9.6-20.4 5.7-2.999-1.8-23.099-13.2-25.499-15-8.101 6.901-17.401 12.301-28.2 16.501V497c0 8.399-6.599 15-15 15h-30c-8.401 0-15-6.601-15-15v-21.4c-10.8-4.2-20.099-9.6-28.2-16.501-2.999 1.8-23.101 13.2-25.499 15-7.202 3.9-16.501 1.501-20.4-5.7-1.802-2.999-13.2-23.399-15-25.8-4.2-7.2-1.802-16.199 5.099-20.4.3 0 22.8-12.9 25.499-14.7-.899-5.7-1.5-10.8-1.5-16.5s.601-11.1 1.8-16.5c-3.3-1.501-23.101-12.601-25.499-14.401-7.202-4.2-9.6-13.5-5.4-20.7 1.8-2.999 13.198-23.399 15-25.8 3.898-7.2 12.9-9.6 20.099-5.7 0 0 23.099 13.2 25.8 15 8.401-7.2 17.701-12.599 28.2-16.5v-50.4l30-30 30 30v50.4c10.499 3.9 19.799 9.3 28.2 16.5l46.5-25.199 30.3 51.599-46.8 25.201c1.199 5.4 1.8 10.8 1.8 16.5s-.601 11.1-1.5 16.5c3.3 1.5 22.8 12.599 25.199 14.399 7.203 4.201 9.601 13.201 5.401 20.401z"
          fill="#ff641a"
          data-original="#ff641a"
        ></path>
        <path
          d="M255.105 442.299s-13.198 23.401-15 26.1c-3.898 7.202-13.198 9.6-20.4 5.7-2.999-1.8-23.099-13.2-25.499-15-8.101 6.901-17.401 12.301-28.2 16.501V497c0 8.399-6.599 15-15 15h-15V226l30 30v50.4c10.499 3.9 19.799 9.3 28.2 16.5l46.5-25.199 30.3 51.599-46.8 25.201c1.199 5.4 1.8 10.8 1.8 16.5s-.601 11.1-1.5 16.5c3.3 1.5 22.8 12.599 25.199 14.399 7.202 4.199 9.6 13.199 5.4 20.399z"
          fill="#f03800"
          data-original="#f03800"
        ></path>
        <path
          d="m271.306 162.7-30.3 51.599-46.8-25.201c-4.2 3.602-8.699 6.601-13.2 9.6-4.799 2.701-9.901 5.101-15 6.901v50.4h-60v-50.4c-10.8-3.9-20.099-9.6-28.2-16.501-2.999 1.8-23.101 13.2-25.499 15-7.202 3.9-16.501 1.501-20.4-5.7-1.802-2.999-13.2-23.399-15-25.8-4.2-7.2-1.802-16.199 5.099-20.4.3 0 22.8-12.9 25.499-14.7-.899-5.4-1.5-10.8-1.5-16.5s.601-11.1 1.8-16.5c-3.3-1.501-23.101-12.601-25.499-14.401-7.202-4.2-9.6-13.5-5.4-20.7 1.8-2.999 13.198-23.399 15-25.8 3.898-7.2 12.9-9.6 20.099-5.7 0 0 23.099 13.2 25.8 15 8.401-7.2 17.701-12.599 28.2-16.5V15c0-8.401 6.599-15 15-15h30c8.401 0 15 6.599 15 15v21.4c10.499 3.9 19.501 9.3 27.9 16.5h.3c2.999-1.8 23.101-13.2 25.499-15 7.202-3.9 16.201-1.5 20.4 5.4 0 0 13.2 23.401 15 26.1 4.2 7.2 1.802 16.5-5.4 20.7-3.3 1.5-23.099 12.601-25.499 14.401 1.199 5.4 1.8 10.8 1.8 16.5s-.601 11.1-1.5 16.5l46.801 25.199z"
          fill="#ffda2d"
          data-original="#ffda2d"
          className=""
        ></path>
        <path
          d="m271.306 162.7-30.3 51.599-46.8-25.201c-4.2 3.602-8.699 6.601-13.2 9.6-4.799 2.701-9.901 5.101-15 6.901v50.4h-30V0h15c8.401 0 15 6.599 15 15v21.4c10.499 3.9 19.501 9.3 27.9 16.5h.3c2.999-1.8 23.101-13.2 25.499-15 7.202-3.9 16.201-1.5 20.4 5.4 0 0 13.2 23.401 15 26.1 4.2 7.2 1.802 16.5-5.4 20.7-3.3 1.5-23.099 12.601-25.499 14.401 1.199 5.4 1.8 10.8 1.8 16.5s-.601 11.1-1.5 16.5l46.8 25.199z"
          fill="#fdbf00"
          data-original="#fdbf00"
          className=""
        ></path>
        <path
          d="M431.505 215.499c-5.7-5.999-15.298-5.999-20.999 0l-34.501 34.2-15 15-19.501-19.2c-5.7-5.999-15.298-5.999-20.999 0-6 5.7-6 15.3 0 21l30 30c2.699 3.001 6.599 4.501 10.499 4.501s7.8-1.5 10.499-4.501l4.501-4.499 55.499-55.501c6.002-5.7 6.002-15.3.002-21zM191.505 350.499c-5.7-5.999-15.298-5.999-20.999 0l-34.501 34.2-15 15-19.501-19.2c-5.7-5.999-15.298-5.999-20.999 0-6 5.7-6 15.3 0 21l30 30c2.699 3.001 6.599 4.501 10.499 4.501s7.8-1.5 10.499-4.501l4.501-4.499 55.499-55.501c6.002-5.7 6.002-15.3.002-21zM191.505 80.499c-5.7-5.999-15.298-5.999-20.999 0l-34.501 34.2-15 15-19.501-19.2c-5.7-5.999-15.298-5.999-20.999 0-6 5.7-6 15.3 0 21l30 30c2.699 3.001 6.599 4.501 10.499 4.501s7.8-1.5 10.499-4.501l4.501-4.499 55.499-55.501c6.002-5.7 6.002-15.3.002-21z"
          fill="#47568c"
          data-original="#47568c"
        ></path>
        <path
          d="M191.505 101.499 136.006 157v-42.301l34.501-34.2c5.7-5.999 15.298-5.999 20.999 0 5.999 5.7 5.999 15.3-.001 21zM191.505 371.499 136.006 427v-42.301l34.501-34.2c5.7-5.999 15.298-5.999 20.999 0 5.999 5.7 5.999 15.3-.001 21zM431.505 236.499 376.006 292v-42.301l34.501-34.2c5.7-5.999 15.298-5.999 20.999 0 5.999 5.7 5.999 15.3-.001 21z"
          fill="#2c3b73"
          data-original="#2c3b73"
          className=""
        ></path>
      </g>
    </svg>
  );
};

const AnalyticsSvg = ({ width = 40 }: { width?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={width}
      x="0"
      y="0"
      viewBox="0 0 512 512"
      className=""
    >
      <g>
        <g fill="#b1dbfc">
          <path
            d="M363.276 166.658a7.569 7.569 0 0 1-4.21-1.277 7.61 7.61 0 0 1-2.119-10.553l82.204-123.515a7.61 7.61 0 0 1 10.554-2.119 7.61 7.61 0 0 1 2.119 10.553L369.62 163.262a7.606 7.606 0 0 1-6.344 3.396zM340.855 172.555a7.573 7.573 0 0 1-3.402-.808l-70.608-35.364a7.61 7.61 0 0 1-3.397-10.214 7.61 7.61 0 0 1 10.215-3.397l70.608 35.364a7.61 7.61 0 0 1 3.397 10.214 7.613 7.613 0 0 1-6.813 4.205zM169.46 216.737a7.611 7.611 0 0 1-5.387-12.989l73.391-73.517a7.61 7.61 0 0 1 10.764-.009 7.611 7.611 0 0 1 .009 10.764l-73.391 73.517a7.584 7.584 0 0 1-5.386 2.234zM76.378 269.728a7.608 7.608 0 0 1-6.778-4.139 7.611 7.611 0 0 1 3.298-10.247l63.302-32.476a7.61 7.61 0 0 1 10.246 3.297 7.611 7.611 0 0 1-3.298 10.247l-63.302 32.476a7.562 7.562 0 0 1-3.468.842z"
            fill="#b1dbfc"
            opacity="1"
            data-original="#b1dbfc"
            className=""
          ></path>
        </g>
        <circle
          cx="58.531"
          cy="270.792"
          r="23.536"
          fill="#ff656f"
          opacity="1"
          data-original="#ff656f"
        ></circle>
        <circle
          cx="157.265"
          cy="221.341"
          r="23.536"
          fill="#ffa85d"
          opacity="1"
          data-original="#ffa85d"
        ></circle>
        <circle
          cx="256"
          cy="122.439"
          r="23.536"
          fill="#fee55a"
          opacity="1"
          data-original="#fee55a"
          className=""
        ></circle>
        <circle
          cx="354.735"
          cy="171.89"
          r="23.536"
          fill="#43cb8e"
          opacity="1"
          data-original="#43cb8e"
          className=""
        ></circle>
        <circle
          cx="453.469"
          cy="23.536"
          r="23.536"
          fill="#23a8fe"
          opacity="1"
          data-original="#23a8fe"
          className=""
        ></circle>
        <path
          fill="#ff4756"
          d="M60.705 270.792c0-8.254 4.252-15.51 10.681-19.712a23.414 23.414 0 0 0-12.855-3.825c-12.999 0-23.536 10.537-23.536 23.536s10.538 23.536 23.536 23.536c4.745 0 9.159-1.409 12.855-3.825-6.43-4.2-10.681-11.456-10.681-19.71z"
          opacity="1"
          data-original="#ff4756"
        ></path>
        <path
          fill="#ff9839"
          d="M159.439 221.341c0-8.254 4.252-15.51 10.681-19.712a23.414 23.414 0 0 0-12.855-3.825c-12.999 0-23.536 10.537-23.536 23.536s10.537 23.536 23.536 23.536c4.745 0 9.159-1.409 12.855-3.825-6.429-4.2-10.681-11.456-10.681-19.71z"
          opacity="1"
          data-original="#ff9839"
          className=""
        ></path>
        <path
          fill="#ffd301"
          d="M258.174 122.439c0-8.254 4.252-15.51 10.681-19.712A23.414 23.414 0 0 0 256 98.902c-12.999 0-23.536 10.537-23.536 23.536s10.538 23.536 23.536 23.536c4.745 0 9.159-1.409 12.855-3.825-6.429-4.2-10.681-11.457-10.681-19.71z"
          opacity="1"
          data-original="#ffd301"
          className=""
        ></path>
        <path
          fill="#00ba66"
          d="M356.909 171.89c0-8.254 4.252-15.51 10.681-19.712a23.414 23.414 0 0 0-12.855-3.825c-12.999 0-23.536 10.537-23.536 23.536s10.538 23.536 23.536 23.536c4.745 0 9.159-1.409 12.855-3.825-6.43-4.2-10.681-11.457-10.681-19.71z"
          opacity="1"
          data-original="#00ba66"
        ></path>
        <path
          fill="#0193fa"
          d="M455.643 23.536c0-8.254 4.252-15.51 10.681-19.712A23.422 23.422 0 0 0 453.469 0c-12.999 0-23.536 10.537-23.536 23.536s10.538 23.536 23.536 23.536c4.745 0 9.159-1.409 12.855-3.825-6.429-4.201-10.681-11.457-10.681-19.711z"
          opacity="1"
          data-original="#0193fa"
          className=""
        ></path>
        <path
          fill="#ff656f"
          d="M83.986 357.91h-50.91a6.365 6.365 0 0 0-6.365 6.365v140.113h63.641V364.276a6.368 6.368 0 0 0-6.366-6.366z"
          opacity="1"
          data-original="#ff656f"
        ></path>
        <path
          fill="#ffa85d"
          d="M182.72 308.459h-50.91a6.365 6.365 0 0 0-6.365 6.365v189.564h63.641V314.825a6.366 6.366 0 0 0-6.366-6.366z"
          opacity="1"
          data-original="#ffa85d"
        ></path>
        <path
          fill="#fee55a"
          d="M281.455 209.126h-50.91a6.365 6.365 0 0 0-6.365 6.365v288.898h63.641V215.491a6.367 6.367 0 0 0-6.366-6.365z"
          opacity="1"
          data-original="#fee55a"
          className=""
        ></path>
        <path
          fill="#43cb8e"
          d="M380.19 259.008h-50.91a6.365 6.365 0 0 0-6.365 6.365v239.015h63.641V265.373a6.367 6.367 0 0 0-6.366-6.365z"
          opacity="1"
          data-original="#43cb8e"
          className=""
        ></path>
        <path
          fill="#23a8fe"
          d="M478.924 109.959h-50.91a6.365 6.365 0 0 0-6.365 6.365v388.064h63.641V116.325a6.366 6.366 0 0 0-6.366-6.366z"
          opacity="1"
          data-original="#23a8fe"
          className=""
        ></path>
        <path
          fill="#ff4756"
          d="M72.187 357.91H33.076a6.365 6.365 0 0 0-6.365 6.365v140.113h39.112V364.276a6.365 6.365 0 0 1 6.364-6.366z"
          opacity="1"
          data-original="#ff4756"
        ></path>
        <path
          fill="#ff9839"
          d="M170.922 308.459H131.81a6.365 6.365 0 0 0-6.365 6.365v189.564h39.112V314.825a6.365 6.365 0 0 1 6.365-6.366z"
          opacity="1"
          data-original="#ff9839"
          className=""
        ></path>
        <path
          fill="#ffd301"
          d="M269.657 209.126h-39.112a6.365 6.365 0 0 0-6.365 6.365v288.898h39.112V215.491a6.364 6.364 0 0 1 6.365-6.365z"
          opacity="1"
          data-original="#ffd301"
          className=""
        ></path>
        <path
          fill="#00ba66"
          d="M368.391 259.008H329.28a6.365 6.365 0 0 0-6.365 6.365v239.015h39.112V265.373a6.364 6.364 0 0 1 6.364-6.365z"
          opacity="1"
          data-original="#00ba66"
        ></path>
        <path
          fill="#0193fa"
          d="M467.126 109.959h-39.112a6.365 6.365 0 0 0-6.365 6.365v388.064h39.112V116.325a6.366 6.366 0 0 1 6.365-6.366z"
          opacity="1"
          data-original="#0193fa"
          className=""
        ></path>
        <path
          fill="#23a8fe"
          d="M502.321 512H9.679c-4.204 0-7.611-3.407-7.611-7.612s3.408-7.611 7.611-7.611h492.642c4.204 0 7.611 3.407 7.611 7.611S506.525 512 502.321 512z"
          opacity="1"
          data-original="#23a8fe"
          className=""
        ></path>
      </g>
    </svg>
  );
};
