import { useFormContext } from "react-hook-form"
import { classNames } from "utils"

const PrimaryInfo = () => {

  const { register, formState: { errors } } = useFormContext()

  return (
    <div>
      <div className="space-y-2">
        <div>
          <div className="flex rounded-md shadow-sm">
            <label className={classNames(
              "inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-50 sm:text-sm",
              errors?.title ? "text-red-500 border-red-500" : "text-gray-500 border-gray-300"
            )}>
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: true })}
              className={classNames(
                "flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm ",
                errors?.title ? "border-red-500 focus:ring-red-500 focus:border-red-500": "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              )}
            />
          </div>
        </div>
        <div>
          <div className="flex rounded-md shadow-sm">
            <label className={classNames(
              "inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-50 sm:text-sm",
              errors?.summary ? "text-red-500 border-red-500" : "text-gray-500 border-gray-300"
            )}>
              Summary
            </label>
            <input
              type="text"
              {...register('summary', { required: true })}
              className={classNames(
                "flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm ",
                errors?.summary ? "border-red-500 focus:ring-red-500 focus:border-red-500": "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              )}
            />
          </div>
        </div>
        <div>
          <div className="flex rounded-md shadow-sm">
            <label className={classNames(
              "inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-50 sm:text-sm",
              errors?.opens_at ? "text-red-500 border-red-500" : "text-gray-500 border-gray-300"
            )}>
              Opens at
            </label>
            <input
              type="datetime-local"
              {...register('opens_at', { required: true })}
              className={classNames(
                "flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm ",
                errors?.opens_at ? "border-red-500 focus:ring-red-500 focus:border-red-500": "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              )}
            />
          </div>
        </div>
        <div>
          <div className="flex rounded-md shadow-sm">
            <label className={classNames(
              "inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-50 sm:text-sm",
              errors?.closes_on ? "text-red-500 border-red-500" : "text-gray-500 border-gray-300"
            )}>
              Closes at
            </label>
            <input
              type="datetime-local"
              {...register('closes_on', { required: true })}
              className={classNames(
                "flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm ",
                errors?.closes_on ? "border-red-500 focus:ring-red-500 focus:border-red-500": "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrimaryInfo