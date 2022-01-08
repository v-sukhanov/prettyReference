using System;
using System.Collections.Generic;
using MassTransit.Futures.Contracts;

namespace PrettyReference.ReferenceManager.Domain.Db
{
    public class GroupReference: BaseEntity
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public List<ReferenceInformation> References { get; set; }
    }
}