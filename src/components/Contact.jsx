const iconMap = {
  Email: (
    <svg viewBox='0 0 24 24' fill='none' className='h-5 w-5'>
      <path
        d='M4 7L11.072 11.714C11.676 12.116 12.324 12.116 12.928 11.714L20 7M5 19H19C19.552 19 20 18.552 20 18V6C20 5.448 19.552 5 19 5H5C4.448 5 4 5.448 4 6V18C4 18.552 4.448 19 5 19Z'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox='0 0 24 24' fill='none' className='h-5 w-5'>
      <path
        d='M7 9V17M7 7V7.01M12 17V12.5C12 11.12 13.12 10 14.5 10C15.88 10 17 11.12 17 12.5V17M4 5H20V19H4V5Z'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  GitHub: (
    <svg viewBox='0 0 24 24' fill='none' className='h-5 w-5'>
      <path
        d='M12 3C7.029 3 3 7.029 3 12C3 15.978 5.579 19.351 9.157 20.543V17.684C7.287 18.091 6.892 16.892 6.892 16.892C6.565 16.06 6.093 15.838 6.093 15.838C5.44 15.391 6.141 15.4 6.141 15.4C6.863 15.451 7.243 16.143 7.243 16.143C7.885 17.243 8.927 16.925 9.337 16.742C9.403 16.276 9.589 15.955 9.795 15.773C8.302 15.603 6.734 14.997 6.734 12.289C6.734 11.518 7.004 10.891 7.447 10.399C7.375 10.222 7.146 9.506 7.52 8.535C7.52 8.535 8.085 8.345 9.371 9.25C9.91 9.096 10.487 9.02 11.064 9.017C11.641 9.02 12.218 9.096 12.757 9.25C14.042 8.345 14.606 8.535 14.606 8.535C14.981 9.506 14.752 10.222 14.68 10.399C15.124 10.891 15.392 11.518 15.392 12.289C15.392 15.003 13.821 15.601 12.323 15.768C12.565 15.982 12.781 16.401 12.781 17.044V20.543C16.359 19.351 18.938 15.978 18.938 12C18.938 7.029 14.971 3 12 3Z'
        fill='currentColor'
      />
    </svg>
  )
}

function Contact ({ contact }) {
  return (
    <section
      id='contact'
      className='scroll-reveal relative overflow-hidden bg-background px-6 py-16 sm:px-8 lg:px-12 lg:py-24'
    >
      <span className='section-number' aria-hidden='true'>
        04
      </span>
      <div className='mx-auto max-w-4xl text-center'>
        <p className='text-sm uppercase tracking-[0.3em] text-accent'>
          Contact
        </p>
        <h2 className='mt-3 text-3xl font-semibold text-white sm:text-4xl'>
          {contact.heading}
        </h2>
        <p className='mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base'>
          {contact.message}
        </p>

        <div className='mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row'>
          {contact.methods.map(method => (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
              data-cursor='link'
              className='contact-link-button inline-flex items-center justify-center gap-3 rounded-full border border-white/12 px-5 py-3 text-sm text-slate-200 transition duration-200 hover:border-accent hover:bg-accent hover:text-white'
            >
              <span className='text-current'>{iconMap[method.label]}</span>
              <span>{method.value}</span>
            </a>
          ))}
        </div>

        <form className='mx-auto mt-12 grid max-w-3xl gap-4 rounded-[1.5rem] border border-white/10 bg-[#10101a] p-6 text-left sm:grid-cols-2 sm:p-8'>
          <label className='space-y-2'>
            <span className='text-sm text-slate-300'>Name</span>
            <input
              type='text'
              name='name'
              placeholder='Your name'
              data-cursor='text'
              className='contact-input w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none'
            />
          </label>

          <label className='space-y-2'>
            <span className='text-sm text-slate-300'>Email</span>
            <input
              type='email'
              name='email'
              placeholder='dhimanamitkkr@gmail.com'
              data-cursor='text'
              className='contact-input w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none'
            />
          </label>

          <label className='space-y-2 sm:col-span-2'>
            <span className='text-sm text-slate-300'>Message</span>
            <textarea
              name='message'
              rows='5'
              placeholder='Tell me about the role, project, or collaboration.'
              data-cursor='text'
              className='contact-input w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none'
            />
          </label>

          <div className='sm:col-span-2'>
            <button
              type='submit'
              data-cursor='button'
              className='btn-primary rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition duration-200 hover:scale-[1.02] hover:bg-indigo-500'
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
